package auth

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/query"
	"horizon/internal/h"
	"horizon/internal/hash"
	"horizon/internal/jsonwebtoken"
	"horizon/internal/pagination"
	"horizon/internal/password"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

func Login(c echo.Context) error {
	body := c.Get("body").(dto.LoginRequest)
	ua := api.FormatUserAgentString(c)
	auth, user, err := loginPreChecks(body)

	if err != nil {
		if auth != nil {
			record(ActivityLogin, false, c.RealIP(), ua, auth.Id)
		}
		return api.NewBadRequestError(ErrInvalidEmailOrPassword)
	}

	tokens, err := createNewTokens(auth, user)

	if err != nil {
		return err
	}

	c.SetCookie(createCookie("accessToken", tokens.AccessToken, tokens.AccessExp))
	c.SetCookie(createCookie("refreshToken", tokens.RefreshToken, tokens.RefreshExp))
	record(ActivityLogin, true, c.RealIP(), ua, auth.Id)

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

	err = createUser(hashed, body)

	if err != nil {
		return err
	}

	_ = sendWelcomeEmail(body.Email, body.Name)

	return c.NoContent(http.StatusCreated)
}

func Logout(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	ua := api.FormatUserAgentString(c)
	record(ActivityLogout, true, c.RealIP(), ua, uuid.MustParse(auth.AuthId))
	cookie := api.GetCookieFromReq(c, "refreshToken")
	_ = removeRefreshToken(cookie.Value)
	c.SetCookie(removeCookie("accessToken"))
	c.SetCookie(removeCookie("refreshToken"))
	return c.NoContent(http.StatusOK)
}

func ChangePassword(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.ChangePasswordRequest)
	ua := api.FormatUserAgentString(c)

	if err := changePasswordPreChecks(auth, body); err != nil {
		record(ActivityPasswordChange, false, c.RealIP(), ua, uuid.MustParse(auth.AuthId))
		return err
	}

	newHash, err := hash.Hash(body.NewPassword)

	if err != nil {
		record(ActivityPasswordChange, false, c.RealIP(), ua, uuid.MustParse(auth.AuthId))
		return api.NewInternalServerError(ErrHash)
	}

	_ = updatePassword(auth.AuthId, newHash)

	qauth, quser, err := query.GetAuthAndUserByEmail(auth.Email)

	if err != nil {
		return err
	}

	tokens, err := createNewTokens(qauth, quser)

	if err != nil {
		record(ActivityPasswordChange, false, c.RealIP(), ua, uuid.MustParse(auth.AuthId))
		return err
	}

	c.SetCookie(createCookie("accessToken", tokens.AccessToken, tokens.AccessExp))
	c.SetCookie(createCookie("refreshToken", tokens.RefreshToken, tokens.RefreshExp))
	record(ActivityPasswordChange, true, c.RealIP(), ua, uuid.MustParse(auth.AuthId))
	return c.NoContent(http.StatusOK)
}

func SendPasswordResetEmail(c echo.Context) error {
	body := c.Get("body").(dto.PasswordResetEmailRequest)

	if cacheHasPasswordResetCode(body.Email) {
		return api.NewTooManyRequestsError(ErrPrevLinkNotExpired)
	}

	if err := sendPasswordResetEmail(body.Email); err != nil {
		return api.NewInternalServerError(err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func ResetPassword(c echo.Context) error {
	body := c.Get("body").(dto.PasswordResetRequest)
	user, err := query.GetUserByEmail(body.Email)

	if err != nil {
		return api.NewBadRequestError(err)
	}

	code, err := getResetPasswordCodeFromCache(body.Email)
	ua := api.FormatUserAgentString(c)

	if err != nil || body.Code != code {
		record(ActivityPasswordReset, false, c.RealIP(), ua, user.AuthId)
		return api.NewBadRequestError(ErrInvalidCode)
	}

	hashed, err := hash.Hash(body.NewPassword)

	if err != nil {
		return api.NewInternalServerError()
	}

	if !password.IsStrong(body.NewPassword) {
		record(ActivityPasswordReset, false, c.RealIP(), ua, user.AuthId)
		return api.NewBadRequestError(ErrPasswordTooWeak)
	}

	_ = updatePassword(user.AuthId.String(), hashed)
	record(ActivityPasswordReset, true, c.RealIP(), ua, user.AuthId)
	return c.NoContent(http.StatusOK)
}

func SendVerifyEmail(c echo.Context) error {
	body := c.Get("body").(dto.VerifyEmailEmailRequest)

	if cacheHasVerifyEmailCode(body.Email) {
		return api.NewTooManyRequestsError(ErrPrevCodeNotExpired)
	}

	if err := sendVerifyEmailEmail(body.Email); err != nil {
		return api.NewInternalServerError(err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func VerifyEmail(c echo.Context) error {
	body := c.Get("body").(dto.VerifyEmailRequest)
	user, err := query.GetUserByEmail(body.Email)

	if err != nil {
		return api.NewBadRequestError(err)
	}

	code, err := getVerifyEmailCodeFromCache(body.Email)
	ua := api.FormatUserAgentString(c)

	if err != nil || body.Code != code {
		record(ActivityEmailVerification, false, c.RealIP(), ua, user.AuthId)
		return api.NewBadRequestError(ErrInvalidCode)
	}

	_ = verifyEmail(body.Email)
	record(ActivityEmailVerification, true, c.RealIP(), ua, user.AuthId)
	return c.NoContent(http.StatusOK)
}

func CompleteOnboarding(c echo.Context) error {
	token := c.Get("auth").(jsonwebtoken.Payload)
	_ = completeOnboarding(token.UserId)
	return c.NoContent(http.StatusOK)
}

func GetPasswordStrength(c echo.Context) error {
	body := c.Get("body").(dto.PasswordStrengthRequest)
	return c.JSON(http.StatusOK, h.Response[int]{
		"data": password.GetStrength(body.Password),
	})
}

func GetNewTokens(c echo.Context) error {
	refreshTokenCookie := api.GetCookieFromReq(c, "refreshToken")

	if refreshTokenCookie == nil {
		return api.NewBadRequestError(ErrMissingRefreshToken)
	}

	key := api.App.Cache.FmtKey("refreshToken", refreshTokenCookie.Value)
	email, err := api.App.Cache.Get(key)

	if err != nil {
		return api.NewBadRequestError(ErrTokenExpired)
	}

	auth, user, err := query.GetAuthAndUserByEmail(email)

	if err != nil {
		return api.NewBadRequestError()
	}

	tokens, err := createNewTokens(auth, user)

	if err != nil {
		return api.NewInternalServerError(ErrTokenCreation)
	}

	c.SetCookie(createCookie("accessToken", tokens.AccessToken, tokens.AccessExp))
	c.SetCookie(createCookie("refreshToken", tokens.RefreshToken, tokens.RefreshExp))
	return c.NoContent(http.StatusOK)
}

func GetAuthActivities(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return api.NewBadRequestError(err.Error())
	}

	activities, count, err := getAuthActivities(auth.AuthId, params)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[dto.GetAuthActivitiesResponse]{
		Data:       activities,
		Pagination: pagination.GetPagination(params, count),
	})
}

func BulkRegister(c echo.Context) error {
	body := c.Get("body").(dto.BulkRegisterRequest)
	errs := make([]error, 0)

	for i, item := range body.Data {
		hashed, err := registerPreChecks(item)

		if err != nil {
			errs = append(errs, err)
		}

		err = createUser(hashed, item)

		if err != nil {
			errs = append(errs, err)
		}

		api.App.Logger.Info("bulk register", zap.Int("user create", i))
	}

	if len(errs) == 0 {
		return c.NoContent(http.StatusCreated)
	}

	return c.JSON(http.StatusOK, h.Response[any]{
		"data": errs,
	})
}
