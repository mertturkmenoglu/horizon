package auth

import (
	"errors"
	"fmt"
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/db/query"
	"horizon/internal/h"
	"horizon/internal/hash"
	"horizon/internal/jsonwebtoken"
	"horizon/internal/pagination"
	"horizon/internal/password"
	"horizon/internal/tasks"
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
	ua := api.FormatUserAgentString(c)
	auth, user, err := query.GetAuthAndUserByEmail(body.Email)
	var hashed = ""

	if err == nil {
		hashed = auth.Password
	}

	matched, hashErr := hash.Verify(body.Password, hashed)
	err = errors.Join(err, hashErr)

	if err != nil || !matched {
		if auth != nil {
			recordLogin(false, c.RealIP(), ua, auth.Id)
		}
		return api.NewBadRequestError("Invalid email or password")
	}

	tokens, err := createNewTokens(auth, user)

	if err != nil {
		return err
	}

	c.SetCookie(createCookie("accessToken", tokens.AccessToken, tokens.AccessExp))
	c.SetCookie(createCookie("refreshToken", tokens.RefreshToken, tokens.RefreshExp))
	recordLogin(true, c.RealIP(), ua, auth.Id)

	if viper.GetBool("api.auth.send-login-alert-email") {
		_ = sendLoginAlertEmail(body.Email, c.RealIP(), ua)
	}

	return c.NoContent(http.StatusOK)
}

func Register(c echo.Context) error {
	body := c.Get("body").(dto.RegisterRequest)
	hashed, err := registerPreChecks(body)

	if err != nil {
		return err
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

	_ = sendWelcomeEmail(body.Email, body.Name)

	return c.NoContent(http.StatusCreated)
}

func Logout(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	recordLogout(auth.AuthId)
	cookie := api.GetCookieFromReq(c, "refreshToken")
	_ = removeRefreshToken(cookie.Value)
	c.SetCookie(removeCookie("accessToken"))
	c.SetCookie(removeCookie("refreshToken"))
	return c.NoContent(http.StatusOK)
}

func ChangePassword(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.ChangePasswordRequest)
	dbAuth, err := query.GetAuthByEmail(auth.Email)

	if err != nil {
		return api.NewInternalServerError()
	}

	var hashed = ""

	if dbAuth != nil {
		hashed = dbAuth.Password
	}

	matched, err := hash.Verify(body.CurrentPassword, hashed)

	if err != nil {
		return api.NewBadRequestError(err.Error())
	}

	if !matched {
		return api.NewUnauthorizedError("Current password doesn't match")
	}

	if !password.IsStrong(body.NewPassword) {
		return api.NewBadRequestError("Password is too weak.")
	}

	newHash, err := hash.Hash(body.NewPassword)

	if err != nil {
		return api.NewInternalServerError("Cannot hash password")
	}

	db.Client.
		Model(&models.Auth{}).
		Where("id = ?", dbAuth.Id).
		Update("password", newHash)

	qauth, quser, err := query.GetAuthAndUserByEmail(auth.Email)

	if err != nil {

		return err
	}

	tokens, err := createNewTokens(qauth, quser)

	if err != nil {
		return err
	}

	c.SetCookie(createCookie("accessToken", tokens.AccessToken, tokens.AccessExp))
	c.SetCookie(createCookie("refreshToken", tokens.RefreshToken, tokens.RefreshExp))

	ua := api.FormatUserAgentString(c)
	recordPasswordChange(true, c.RealIP(), ua, dbAuth.Id)

	return c.NoContent(http.StatusOK)
}

func SendPasswordResetEmail(c echo.Context) error {
	body := c.Get("body").(dto.PasswordResetEmailRequest)
	cache := api.App.Cache
	key := cache.FmtKey("passwordReset", body.Email)
	has := cache.Has(key)

	if has {
		return api.NewTooManyRequestsError("Previous link hasn't expired")
	}

	randUuid := uuid.New().String()
	ttl := time.Minute * 15
	url := fmt.Sprintf(viper.GetString("api.auth.password.reset-url"), randUuid, body.Email)
	_ = cache.Set(key, randUuid, ttl)
	payload := tasks.PasswordResetEmailPayload{
		Email: body.Email,
		Url:   url,
	}

	t, err := tasks.NewTask(tasks.TypePasswordResetEmail, payload)

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func ResetPassword(c echo.Context) error {
	body := c.Get("body").(dto.PasswordResetRequest)
	cache := api.App.Cache
	key := cache.FmtKey("passwordReset", body.Email)
	ccode, cerr := cache.Get(key)
	ua := api.FormatUserAgentString(c)

	user, err := query.GetUserByEmail(body.Email)

	if err != nil || user == nil {
		return api.NewBadRequestError(err.Error())
	}

	if cerr != nil || body.Code != ccode {
		recordPasswordReset(false, c.RealIP(), ua, user.AuthId)
		return api.NewBadRequestError("Invalid code")
	}

	hashed, err := hash.Hash(body.NewPassword)

	if err != nil {
		return api.NewInternalServerError()
	}

	if !password.IsStrong(body.NewPassword) {
		recordPasswordReset(false, c.RealIP(), ua, user.AuthId)
		return api.NewBadRequestError("Password is too weak.")
	}

	db.Client.
		Model(&models.Auth{}).
		Where("id = ?", user.AuthId).
		Update("password", hashed)

	recordPasswordReset(true, c.RealIP(), ua, user.AuthId)

	return c.NoContent(http.StatusOK)
}

func SendVerifyEmail(c echo.Context) error {
	body := c.Get("body").(dto.VerifyEmailEmailRequest)
	cache := api.App.Cache
	key := cache.FmtKey("verifyEmail", body.Email)
	has := cache.Has(key)

	if has {
		return api.NewTooManyRequestsError("Previous code hasn't expired")
	}

	randUuid := uuid.New().String()
	ttl := time.Minute * 15
	url := fmt.Sprintf(viper.GetString("api.auth.email.verify-url"), randUuid, body.Email)
	_ = cache.Set(key, randUuid, ttl)

	t, err := tasks.NewTask(tasks.TypeVerifyEmailEmail, tasks.VerifyEmailEmailPayload{
		Email: body.Email,
		Url:   url,
	})

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func VerifyEmail(c echo.Context) error {
	body := c.Get("body").(dto.VerifyEmailRequest)
	cache := api.App.Cache
	key := cache.FmtKey("verifyEmail", body.Email)
	ccode, cerr := cache.Get(key)
	ua := api.FormatUserAgentString(c)

	user, err := query.GetUserByEmail(body.Email)

	if err != nil || user == nil {
		return api.NewBadRequestError(err.Error())
	}

	if cerr != nil || body.Code != ccode {
		recordEmailVerification(false, c.RealIP(), ua, user.AuthId)
		return api.NewBadRequestError("Invalid code")
	}

	db.Client.
		Model(&models.User{}).
		Where("email = ?", body.Email).
		Update("email_verified", true)

	recordEmailVerification(true, c.RealIP(), ua, user.AuthId)
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

func GetNewTokens(c echo.Context) error {
	refreshTokenCookie := api.GetCookieFromReq(c, "refreshToken")

	if refreshTokenCookie == nil {
		return api.NewBadRequestError("Missing refresh token")
	}

	cache := api.App.Cache
	key := cache.FmtKey("refreshToken", refreshTokenCookie.Value)
	email, err := cache.Get(key)

	if err != nil {
		return api.NewBadRequestError("Token expired")
	}

	auth, user, err := query.GetAuthAndUserByEmail(email)

	if err != nil {
		return api.NewBadRequestError()
	}

	tokens, err := createNewTokens(auth, user)

	if err != nil {
		return api.NewInternalServerError("Cannot create token")
	}

	c.SetCookie(createCookie("accessToken", tokens.AccessToken, tokens.AccessExp))
	c.SetCookie(createCookie("refreshToken", tokens.RefreshToken, tokens.RefreshExp))

	return c.NoContent(http.StatusOK)
}

func GetAuthActivities(c echo.Context) error {
	token := c.Get("auth").(jsonwebtoken.Payload)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return api.NewBadRequestError(err.Error())
	}

	var activities []*models.AuthActivity
	var count int64

	res := db.Client.
		Where("auth_id = ?", token.AuthId).
		Order("created_at DESC").
		Limit(params.PageSize).
		Offset(params.Offset).
		Find(&activities)

	if res.Error != nil {
		return api.NewBadRequestError()
	}

	res = db.Client.
		Table("auth_activities").
		Where("auth_id = ?", token.AuthId).
		Count(&count)

	if res.Error != nil {
		fmt.Println(res.Error)
		return api.NewBadRequestError()
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[dto.GetAuthActivitiesResponse]{
		Data:       activities,
		Pagination: pagination.GetPagination(params, count),
	})
}
