package router

import (
	"errors"
	"fmt"
	"horizon/internal/api/v1/dto"
	"horizon/internal/cache"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/db/query"
	"horizon/internal/h"
	"horizon/internal/hash"
	"horizon/internal/jsonwebtoken"
	"horizon/internal/password"
	"horizon/internal/tasks"
	"log/slog"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func Login(c echo.Context) error {
	body := c.Get("body").(dto.LoginRequest)

	auth, authErr := query.GetAuthByEmail(body.Email)
	user, userErr := query.GetUserByEmail(body.Email)

	var hashed = ""

	if authErr == nil {
		hashed = auth.Password
	}

	matched, hashErr := hash.Verify(body.Password, hashed)

	err := errors.Join(authErr, userErr, hashErr)

	if err != nil || !matched {
		slog.Info("Invalid login attempt", "email", body.Email)
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	accessTokenExpiresAt := time.Now().Add(15 * time.Minute)

	accessToken, err := jsonwebtoken.Encode(jsonwebtoken.Payload{
		AuthId: auth.Id.String(),
		UserId: user.Id.String(),
		Name:   user.Name,
		Email:  user.Email,
	}, accessTokenExpiresAt)

	if err != nil {
		slog.Error("Token creation failed", "err", err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError, "Cannot create token")
	}

	refreshToken := uuid.New().String()
	key := fmt.Sprintf("refreshToken:%s", auth.Id.String())
	dur := time.Hour * 24 * 14
	expires := time.Now().Add(dur)

	_ = cache.Set(key, refreshToken, dur)

	c.SetCookie(createCookie("accessToken", accessToken, accessTokenExpiresAt))
	c.SetCookie(createCookie("refreshToken", refreshToken, expires))

	if viper.GetBool("api.auth.send-login-alert-email") {
		slog.Info("Sending login alert email", "email", body.Email)
		err := sendLoginAlertEmail(body.Email)

		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	return c.NoContent(http.StatusOK)
}

func Register(c echo.Context) error {
	body := c.Get("body").(dto.RegisterRequest)
	hashed, hashErr := hash.Hash(body.Password)
	isStrongPassword := password.IsStrong(body.Password)
	exists, queryErr := query.DoesAuthExist(body.Email)
	err := errors.Join(hashErr, queryErr)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if exists {
		return echo.NewHTTPError(http.StatusBadRequest, "Email has already been taken")
	}

	exists = query.UsernameExists(body.Username)

	if exists {
		return echo.NewHTTPError(http.StatusBadRequest, "Username has already been taken")
	}

	if !isStrongPassword {
		return echo.NewHTTPError(http.StatusBadRequest, "Password is too weak.")
	}

	err = db.Client.Transaction(func(tx *gorm.DB) error {
		auth := models.Auth{
			Password: hashed,
		}

		res := tx.Create(&auth)

		if res.Error != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
		}

		user := models.User{
			AuthId:              auth.Id,
			Name:                body.Name,
			Email:               body.Email,
			Username:            body.Username,
			OnboardingCompleted: false,
			EmailVerified:       false,
		}

		res = tx.Omit(clause.Associations).Create(&user)

		if res.Error != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
		}

		// return nil will commit the whole transaction
		return nil
	})

	if err != nil {
		return err
	}

	err = sendWelcomeEmail(body.Email, body.Name)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusCreated)
}

func Logout(c echo.Context) error {
	c.SetCookie(removeCookie("accessToken"))
	c.SetCookie(removeCookie("refreshToken"))
	return c.NoContent(http.StatusOK)
}

func ChangePassword(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.ChangePasswordRequest)
	dbAuth, err := query.GetAuthByEmail(auth.Email)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError)
	}

	var hashed = ""

	if dbAuth != nil {
		hashed = dbAuth.Password
	}

	// Always calculate the password hash before any early return
	// to prevent timing based attacks.
	matched, hashErr := hash.Verify(body.CurrentPassword, hashed)
	err = errors.Join(err, hashErr)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if !matched {
		return echo.NewHTTPError(http.StatusUnauthorized, "Current password doesn't match")
	}

	isStrongPassword := password.IsStrong(body.NewPassword)

	if !isStrongPassword {
		return echo.NewHTTPError(http.StatusBadRequest, "Password is too weak.")
	}

	newHash, hashErr := hash.Hash(body.NewPassword)

	if hashErr != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Cannot hash password")
	}

	db.Client.
		Model(&models.Auth{}).
		Where("id = ?", dbAuth.Id).
		Update("password", newHash)

	return c.NoContent(http.StatusOK)
}

func SendPasswordResetEmail(c echo.Context) error {
	body := c.Get("body").(dto.PasswordResetEmailRequest)
	randUuid := uuid.New().String()
	key := fmt.Sprintf("passwordReset:%s", randUuid)
	ttl := time.Minute * 15
	url := fmt.Sprintf(viper.GetString("api.auth.password.reset-url"), randUuid)
	_ = cache.Set(key, body.Email, ttl)

	t, err := tasks.NewTask[tasks.PasswordResetEmailPayload](tasks.TypePasswordResetEmail, tasks.PasswordResetEmailPayload{
		Email: body.Email,
		Url:   url,
	})

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func ResetPassword(c echo.Context) error {
	body := c.Get("body").(dto.PasswordResetRequest)
	key := fmt.Sprintf("passwordReset:%s", body.Code)
	email, err := cache.Get(key)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid code")
	}

	user, err := query.GetUserByEmail(email)

	if err != nil || user == nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	hashed, err := hash.Hash(body.NewPassword)
	isStrongPassword := password.IsStrong(body.NewPassword)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError)
	}

	if !isStrongPassword {
		return echo.NewHTTPError(http.StatusBadRequest, "Password is too weak.")
	}

	db.Client.
		Model(&models.Auth{}).
		Where("id = ?", user.AuthId).
		Update("password", hashed)

	return c.NoContent(http.StatusOK)
}

func SendVerifyEmail(c echo.Context) error {
	body := c.Get("body").(dto.PasswordResetEmailRequest)
	randUuid := uuid.New().String()
	key := fmt.Sprintf("verifyEmail:%s", randUuid)
	ttl := time.Minute * 15
	url := fmt.Sprintf(viper.GetString("api.auth.email.verify-url"), randUuid)
	_ = cache.Set(key, body.Email, ttl)

	t, err := tasks.NewTask[tasks.VerifyEmailEmailPayload](tasks.TypeVerifyEmailEmail, tasks.VerifyEmailEmailPayload{
		Email: body.Email,
		Url:   url,
	})

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func VerifyEmail(c echo.Context) error {
	body := c.Get("body").(dto.VerifyEmailRequest)
	key := fmt.Sprintf("verifyEmail:%s", body.Code)
	email, err := cache.Get(key)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid code")
	}

	user, err := query.GetUserByEmail(email)

	if err != nil || user == nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	db.Client.
		Model(&models.User{}).
		Where("email = ?", email).
		Update("email_verified", true)

	return c.NoContent(http.StatusOK)
}

func CompleteOnboarding(c echo.Context) error {
	token := c.Get("auth").(jsonwebtoken.Payload)

	db.Client.
		Model(&models.User{}).
		Where("id = ?", token.UserId).
		Update("onboarding_completed", true)

	return c.NoContent(http.StatusOK)
}

func GetPasswordStrength(c echo.Context) error {
	body := c.Get("body").(dto.PasswordStrengthRequest)
	strength := password.GetStrength(body.Password)

	return c.JSON(http.StatusOK, h.Response[int]{
		"data": strength,
	})
}

func createCookie(name string, value string, expires time.Time) *http.Cookie {
	return &http.Cookie{
		Name:     name,
		Value:    value,
		Expires:  expires,
		Secure:   viper.GetString("env") != "dev",
		HttpOnly: true,
		Path:     "/",
		SameSite: http.SameSiteLaxMode,
	}
}

func removeCookie(name string) *http.Cookie {
	return &http.Cookie{
		Name:     name,
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		SameSite: http.SameSiteLaxMode,
	}
}

func sendLoginAlertEmail(to string) error {
	t, err := tasks.NewTask[tasks.NewLoginAlertEmailPayload](tasks.TypeNewLoginAlertEmail, tasks.NewLoginAlertEmailPayload{
		Email: to,
	})

	if err != nil {
		return err
	}

	_, err = tasks.Client.Enqueue(t)

	return err
}

func sendWelcomeEmail(email string, name string) error {
	t, err := tasks.NewTask[tasks.WelcomeEmailPayload](tasks.TypeWelcomeEmail, tasks.WelcomeEmailPayload{
		Email: email,
		Name:  name,
	})

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	return err
}
