package router

import (
	"errors"
	"fmt"
	"horizon/internal/api/v1/dto"
	"horizon/internal/cache"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/db/query"
	"horizon/internal/geo"
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
	"github.com/mileusna/useragent"
	"github.com/spf13/viper"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func formattedUserAgentString(c echo.Context) string {
	ua := useragent.Parse(c.Request().UserAgent())
	return fmt.Sprintf("%s browser %s OS %s device", ua.Name, ua.OS, ua.Device)
}

func Login(c echo.Context) error {
	body := c.Get("body").(dto.LoginRequest)

	auth, authErr := query.GetAuthByEmail(body.Email)
	user, userErr := query.GetUserByEmail(body.Email)
	ua := formattedUserAgentString(c)

	var hashed = ""

	if authErr == nil {
		hashed = auth.Password
	}

	matched, hashErr := hash.Verify(body.Password, hashed)

	err := errors.Join(authErr, userErr, hashErr)

	if err != nil || !matched {
		recordLoginAttempt(false, c.RealIP(), ua, auth)
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	access, accExp, accErr := createNewAccessToken(auth, user)
	refresh, refExp, refErr := createNewRefreshToken(body.Email)

	if accErr != nil || refErr != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Cannot create token")
	}

	c.SetCookie(createCookie("accessToken", access, accExp))
	c.SetCookie(createCookie("refreshToken", refresh, refExp))

	if viper.GetBool("api.auth.send-login-alert-email") {
		recordLoginAttempt(true, c.RealIP(), ua, auth)
		err := sendLoginAlertEmail(body.Email, c.RealIP(), ua)

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
	cookie := h.GetCookieFromReq(c, "refreshToken")
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
		return echo.NewHTTPError(http.StatusInternalServerError)
	}

	var hashed = ""

	if dbAuth != nil {
		hashed = dbAuth.Password
	}

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
	key := fmt.Sprintf("passwordReset:%s", body.Email)
	_, err := cache.Get(key)

	if err == nil {
		return echo.NewHTTPError(http.StatusTooManyRequests, "previous password reset link hasn't expired")
	}

	randUuid := uuid.New().String()
	ttl := time.Minute * 15
	url := fmt.Sprintf(viper.GetString("api.auth.password.reset-url"), randUuid, body.Email)
	_ = cache.Set(key, randUuid, ttl)

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
	key := fmt.Sprintf("passwordReset:%s", body.Email)
	cacheCode, err := cache.Get(key)

	if err != nil || body.Code != cacheCode {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid code")
	}

	user, err := query.GetUserByEmail(body.Email)

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
	body := c.Get("body").(dto.VerifyEmailEmailRequest)
	key := fmt.Sprintf("verifyEmail:%s", body.Email)

	_, err := cache.Get(key)

	if err == nil {
		return echo.NewHTTPError(http.StatusTooManyRequests, "previous verification code hasn't expired")
	}

	randUuid := uuid.New().String()
	ttl := time.Minute * 15
	url := fmt.Sprintf(viper.GetString("api.auth.email.verify-url"), randUuid, body.Email)
	_ = cache.Set(key, randUuid, ttl)

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
	key := fmt.Sprintf("verifyEmail:%s", body.Email)
	cacheCode, err := cache.Get(key)

	if err != nil || body.Code != cacheCode {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid code")
	}

	user, err := query.GetUserByEmail(body.Email)

	if err != nil || user == nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	db.Client.
		Model(&models.User{}).
		Where("email = ?", body.Email).
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

func GetNewTokens(c echo.Context) error {
	refreshTokenCookie := h.GetCookieFromReq(c, "refreshToken")

	if refreshTokenCookie == nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Missing refresh token")
	}

	key := fmt.Sprintf("refreshToken:%s", refreshTokenCookie.Value)
	email, err := cache.Get(key)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Token expired")
	}

	auth, authErr := query.GetAuthByEmail(email)
	user, userErr := query.GetUserByEmail(email)

	if authErr != nil || userErr != nil {
		return echo.NewHTTPError(http.StatusBadRequest)
	}

	accessToken, accessExp, accessErr := createNewAccessToken(auth, user)
	refreshToken, refreshExp, refreshErr := createNewRefreshToken(user.Email)

	if accessErr != nil || refreshErr != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Cannot create token")
	}

	c.SetCookie(createCookie("accessToken", accessToken, accessExp))
	c.SetCookie(createCookie("refreshToken", refreshToken, refreshExp))

	return c.NoContent(http.StatusOK)
}

func GetAuthActivities(c echo.Context) error {
	token := c.Get("auth").(jsonwebtoken.Payload)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	var activities []*models.AuthActivity
	var count int64

	res := db.Client.
		Where("auth_id = ?", token.AuthId).
		Order("created_at DESC").
		Limit(params.PageSize).
		Offset(params.Offset).
		Find(&activities).
		Count(&count)

	if res.Error != nil {
		return echo.NewHTTPError(http.StatusBadRequest)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[dto.GetAuthActivitiesResponse]{
		Data:       activities,
		Pagination: pagination.GetPagination(params, count),
	})
}

func createNewAccessToken(auth *models.Auth, user *models.User) (string, time.Time, error) {
	ttl := time.Duration(viper.GetInt64("api.auth.token.access-ttl")) * time.Minute
	exp := time.Now().Add(ttl)
	token, err := jsonwebtoken.Encode(jsonwebtoken.Payload{
		AuthId: auth.Id.String(),
		UserId: user.Id.String(),
		Name:   user.Name,
		Email:  user.Email,
	}, exp)
	return token, exp, err
}

func createNewRefreshToken(email string) (string, time.Time, error) {
	token := uuid.New().String()
	key := fmt.Sprintf("refreshToken:%s", token)
	ttl := time.Minute * time.Duration(viper.GetInt64("api.auth.token.refresh-ttl"))
	exp := time.Now().Add(ttl)
	err := cache.Set(key, email, ttl)
	return token, exp, err
}

func removeRefreshToken(token string) error {
	key := fmt.Sprintf("refreshToken:%s", token)
	return cache.Del(key)
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

func sendLoginAlertEmail(to string, ip string, useragent string) error {
	location, err := geo.GetFormattedLocation(ip)

	t, err := tasks.NewTask[tasks.NewLoginAlertEmailPayload](tasks.TypeNewLoginAlertEmail, tasks.NewLoginAlertEmailPayload{
		Email:     to,
		Location:  location,
		UserAgent: useragent,
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

func recordLoginAttempt(success bool, ip string, useragent string, auth *models.Auth) {
	if auth == nil {
		return
	}

	location, _ := geo.GetFormattedLocation(ip)

	db.Client.Create(&models.AuthActivity{
		AuthId:    auth.Id,
		CreatedAt: time.Now(),
		IpAddress: ip,
		Success:   success,
		Location:  location,
		UserAgent: useragent,
	})
}
