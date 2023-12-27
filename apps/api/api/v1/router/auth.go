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
	"net/http"
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

	_ = cache.Set(tokenCacheKey, refreshToken, time.Hour*24*14)

	c.SetCookie(&http.Cookie{
		Name:     "accessToken",
		Value:    accessToken,
		Path:     "/",
		Expires:  expiresAt,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})

	c.SetCookie(&http.Cookie{
		Name:     "refreshToken",
		Value:    refreshToken,
		Path:     "/",
		Expires:  time.Now().Add(time.Hour * 24 * 14),
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})

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
			EmailVerified: false,
			Password:      hashed,
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

	return c.NoContent(http.StatusCreated)
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
	return echo.NewHTTPError(http.StatusNotImplemented, "Not implemented")
}

func ResetPassword(c echo.Context) error {
	return echo.NewHTTPError(http.StatusNotImplemented, "Not implemented")
}

func SendVerifyEmail(c echo.Context) error {
	return echo.NewHTTPError(http.StatusNotImplemented, "Not implemented")
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
