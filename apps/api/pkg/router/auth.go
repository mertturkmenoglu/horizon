package router

import (
	"fmt"
	"horizon/pkg/cache"
	"horizon/pkg/db"
	"horizon/pkg/db/models"
	"horizon/pkg/db/query"
	"horizon/pkg/dto"
	"horizon/pkg/h"
	"horizon/pkg/hash"
	"horizon/pkg/jsonwebtoken"
	"horizon/pkg/password"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func Login(c echo.Context) error {
	body := c.Get("body").(dto.LoginRequest)

	auth, err := query.GetAuthByEmail(body.Email)
	var hashed = ""

	if auth != nil {
		hashed = auth.Password
	}

	// Always calculate the password hash before any early return
	// to prevent timing based attacks.
	matched, hashErr := hash.Verify(body.Password, hashed)

	if err != nil || auth == nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	if hashErr != nil || !matched {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	fullName := strings.TrimSpace(fmt.Sprintf("%s %s", auth.FirstName, auth.LastName))

	payload := jsonwebtoken.Payload{
		AuthId:   auth.Id.String(),
		UserId:   "",
		FullName: fullName,
		Email:    auth.Email,
	}

	expiresAt := time.Now().Add(15 * time.Minute)

	accessToken, err := jsonwebtoken.Encode(payload, expiresAt)
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
	exists, err := query.DoesUserExist(body.Email)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if exists {
		return echo.NewHTTPError(http.StatusBadRequest, "Email has already been taken")
	}

	if !isStrongPassword {
		return echo.NewHTTPError(http.StatusBadRequest, "Password is too weak.")
	}

	auth := models.Auth{
		FirstName:           "",
		LastName:            "",
		Email:               body.Email,
		OnboardingCompleted: false,
		EmailVerified:       false,
		Password:            hashed,
	}

	res := db.Client.Create(&auth)

	if res.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}

	return c.NoContent(http.StatusCreated)
}

func ChangePassword(c echo.Context) error {
	return echo.NewHTTPError(http.StatusNotImplemented, "Not implemented")
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

func SendMfaCode(c echo.Context) error {
	return echo.NewHTTPError(http.StatusNotImplemented, "Not implemented")
}

func CompleteOnboarding(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)

	db.Client.
		Model(&models.Auth{}).
		Where("email = ?", auth.Email).
		Update("onboarding_completed", true)

	return c.NoContent(http.StatusNoContent)
}

func GetPasswordStrength(c echo.Context) error {
	body := c.Get("body").(dto.PasswordStrengthRequest)
	strength := password.GetStrength(body.Password)

	return c.JSON(http.StatusOK, h.Response{
		"data": strength,
	})
}
