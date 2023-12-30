package router

import (
	"fmt"
	"horizon/api/v1/dto"
	"horizon/internal/cache"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/db/query"
	"horizon/internal/h"
	"horizon/internal/hash"
	"horizon/internal/jsonwebtoken"
	"horizon/internal/password"
	"horizon/internal/tasks"
	"net/http"
	"os"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Login(c echo.Context) error {
	body := c.Get("body").(dto.LoginRequest)

	auth, authErr := query.GetAuthByEmail(body.Email)
	var hashed = ""

	if auth != nil {
		hashed = auth.Password
	}

	user, userErr := query.GetUserByEmail(body.Email)

	// Always calculate the password hash before any early return
	// to prevent timing based attacks.
	matched, hashErr := hash.Verify(body.Password, hashed)

	if authErr != nil || userErr != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	if hashErr != nil || !matched {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	payload := jsonwebtoken.Payload{
		AuthId: auth.Id.String(),
		UserId: user.Id.String(),
		Name:   user.Name,
		Email:  user.Email,
	}

	expiresAt := time.Now().Add(15 * time.Minute)

	accessToken, err := jsonwebtoken.Encode(payload, expiresAt)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Cannot create token")
	}

	refreshToken := uuid.New().String()
	tokenCacheKey := fmt.Sprintf("refreshToken:%s", auth.Id)
	refreshTokenDuration := time.Hour * 24 * 14
	refreshTokenExpires := time.Now().Add(refreshTokenDuration)

	_ = cache.Set(tokenCacheKey, refreshToken, refreshTokenDuration)

	isDev := os.Getenv("ENV") == "dev"

	c.SetCookie(&http.Cookie{
		Name:     "accessToken",
		Value:    accessToken,
		Expires:  expiresAt,
		Secure:   !isDev,
		HttpOnly: true,
		Path:     "/",
		SameSite: http.SameSiteLaxMode,
	})

	c.SetCookie(&http.Cookie{
		Name:     "refreshToken",
		Value:    refreshToken,
		Expires:  refreshTokenExpires,
		Secure:   !isDev,
		HttpOnly: true,
		Path:     "/",
		SameSite: http.SameSiteLaxMode,
	})

	t, err := tasks.NewTask[tasks.NewLoginAlertEmailPayload](tasks.TypeNewLoginAlertEmail, tasks.NewLoginAlertEmailPayload{
		Email: body.Email,
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

func Register(c echo.Context) error {
	body := c.Get("body").(dto.RegisterRequest)

	// Always calculate the password hash and the entropy (strength)
	// before any early return to prevent timing based attacks.
	// For more info, refer to OWASP.
	hashed, err := hash.Hash(body.Password)
	isStrongPassword := password.IsStrong(body.Password)

	// Check if user exists
	exists, err := query.DoesAuthExist(body.Email)

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
		}

		res = tx.Create(&user)

		if res.Error != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
		}

		// return nil will commit the whole transaction
		return nil
	})

	if err != nil {
		return err
	}

	t, err := tasks.NewTask[tasks.WelcomeEmailPayload](tasks.TypeWelcomeEmail, tasks.WelcomeEmailPayload{
		Email: body.Email,
		Name:  body.Name,
	})

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusCreated)
}

func Logout(c echo.Context) error {
	c.SetCookie(&http.Cookie{
		Name:     "accessToken",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		SameSite: http.SameSiteLaxMode,
	})

	c.SetCookie(&http.Cookie{
		Name:     "refreshToken",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		SameSite: http.SameSiteLaxMode,
	})

	return c.NoContent(http.StatusOK)
}

func ChangePassword(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.ChangePasswordRequest)

	dbAuth, err := query.GetAuthByEmail(auth.Email)
	var hashed = ""

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError)
	}

	if dbAuth != nil {
		hashed = dbAuth.Password
	}

	// Always calculate the password hash before any early return
	// to prevent timing based attacks.
	matched, hashErr := hash.Verify(body.CurrentPassword, hashed)

	if hashErr != nil {
		return echo.NewHTTPError(http.StatusBadRequest, hashErr.Error())
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

	cacheKey := fmt.Sprintf("password-reset:%s", randUuid)
	cacheTTL := time.Minute * 15

	_ = cache.Set(cacheKey, body.Email, cacheTTL)

	// TODO: Update link according to environment
	url := fmt.Sprintf("http://localhost:5173/password/reset/%s", randUuid)

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

	cacheKey := fmt.Sprintf("password-reset:%s", body.Code)
	email, err := cache.Get(cacheKey)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid code")
	}

	// Check if user exists
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

	cacheKey := fmt.Sprintf("verify-email:%s", randUuid)
	cacheTTL := time.Minute * 15

	_ = cache.Set(cacheKey, body.Email, cacheTTL)

	// TODO: Update link according to environment
	url := fmt.Sprintf("http://localhost:5173/verify-email/%s", randUuid)

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

	cacheKey := fmt.Sprintf("verify-email:%s", body.Code)
	email, err := cache.Get(cacheKey)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid code")
	}

	// Check if user exists
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
	auth := c.Get("auth").(jsonwebtoken.Payload)

	db.Client.
		Model(&models.Auth{}).
		Where("email = ?", auth.Email).
		Update("onboarding_completed", true)

	return c.NoContent(http.StatusOK)
}

func GetPasswordStrength(c echo.Context) error {
	body := c.Get("body").(dto.PasswordStrengthRequest)
	strength := password.GetStrength(body.Password)

	return c.JSON(http.StatusOK, h.Response{
		"data": strength,
	})
}
