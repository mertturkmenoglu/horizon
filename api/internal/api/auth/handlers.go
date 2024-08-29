package auth

import (
	"fmt"
	"horizon/config"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/hash"
	"horizon/internal/random"
	"horizon/internal/tasks"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

// Login With Google godoc
//
//	@Summary		Login with Google OAuth2
//	@Description	Login with Google OAuth2
//	@Tags			Auth
//	@Accept			json
//	@Success		307
//	@Failure		500	{object}	error
//	@Router			/auth/google [get]
func (s *handlers) HandlerGoogle(c echo.Context) error {
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	state, url, err := s.service.getOAuthStateAndRedirectUrl()

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess.Values["state"] = state

	sess.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusTemporaryRedirect, url)
}

// Google Callback godoc
//
//	@Summary		Google OAuth2 callback
//	@Description	Google OAuth2 callback
//	@Tags			Auth
//	@Accept			json
//	@Success		307
//	@Failure		400						{object}	error
//	@Failure		500						{object}	error
//	@Router			/auth/google/callback	[get]
func (s *handlers) HandlerGoogleCallback(c echo.Context) error {
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	token, err := s.service.getOAuthToken(sess, c.QueryParam("state"), c.QueryParam("code"))

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	delete(sess.Values, "state")
	sess.Save(c.Request(), c.Response())

	userInfo, err := s.service.fetchGoogleUser(token)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	userId, err := s.service.getOrCreateUserId(userInfo)

	if err != nil {
		return echo.ErrInternalServerError
	}

	sessionId := uuid.New().String()
	err = s.service.createSession(sessionId, userId)

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess.Options = getAuthSessionOptions()
	sess.Values["user_id"] = userId
	sess.Values["session_id"] = sessionId
	sess.Save(c.Request(), c.Response())
	redirectUrl := viper.GetString(config.GOOGLE_REDIRECT)

	return c.Redirect(http.StatusTemporaryRedirect, redirectUrl)
}

// Get Me godoc
//
//	@Summary		Gets the current user
//	@Description	Gets the currently authenticated user or returns an error
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Success		200 {object}	GetMeResponseDto
//	@Failure		401	{object}	error
//	@Router			/auth/me [get]
func (s *handlers) HandlerGetMe(c echo.Context) error {
	user := c.Get("user").(db.User)
	res := mapGetMeResponseToDto(user)

	return c.JSON(http.StatusOK, h.Response[GetMeResponseDto]{
		Data: res,
	})
}

// Logout godoc
//
//	@Summary		Logs out the current user
//	@Description	Logs out the current user
//	@Tags			Auth
//	@Accept			json
//	@Success		204
//	@Failure		401	{object}	error
//	@Failure		500	{object}	error
//	@Router			/auth/logout [post]
func (s *handlers) HandlerLogout(c echo.Context) error {
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	delete(sess.Values, "user_id")
	sess.Save(c.Request(), c.Response())
	cookie := s.service.resetCookie()
	c.SetCookie(cookie)

	return c.NoContent(http.StatusNoContent)
}

func (s *handlers) HandlerCredentialsLogin(c echo.Context) error {
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	body := c.Get("body").(LoginRequestDto)
	user, err := s.service.getUserByEmail(body.Email)
	var hashed = ""

	if err == nil {
		hashed = user.PasswordHash.String
	}

	matched, err := hash.Verify(body.Password, hashed)

	if !matched || err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, errInvalidEmailOrPassword.Error())
	}

	sessionId := uuid.New().String()
	err = s.service.createSession(sessionId, user.ID)

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess.Options = getAuthSessionOptions()
	sess.Values["user_id"] = user.ID
	sess.Values["session_id"] = sessionId
	sess.Save(c.Request(), c.Response())

	return c.NoContent(http.StatusOK)
}

func (s *handlers) HandlerCredentialsRegister(c echo.Context) error {
	body := c.Get("body").(RegisterRequestDto)
	err := s.service.checkIfEmailOrUsernameIsTaken(body.Email, body.Username)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	// Check username characters
	ok := isValidUsername(body.Username)

	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, errUsernameChars.Error())
	}

	_, err = s.service.createUserFromCredentialsInfo(body)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "cannot create user")
	}

	s.tasks.CreateAndEnqueue(tasks.TypeWelcomeEmail, tasks.WelcomeEmailPayload{
		Email: body.Email,
		Name:  body.FullName,
	})

	return c.NoContent(http.StatusCreated)
}

func (s *handlers) HandlerSendVerificationEmail(c echo.Context) error {
	body := c.Get("body").(SendVerificationEmailRequestDto)
	user, err := s.service.getUserByEmail(body.Email)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, errInvalidEmail.Error())
	}

	if user.IsEmailVerified {
		return echo.NewHTTPError(http.StatusBadRequest, errEmailAlreadyVerified.Error())
	}

	code, err := random.DigitsString(6)

	if err != nil {
		return echo.ErrInternalServerError
	}

	key := fmt.Sprintf("verify-email:%s", code)
	s.cache.Set(key, body.Email, time.Minute*15)

	url := s.service.getEmailVerifyUrl(code)

	_, err = s.tasks.CreateAndEnqueue(tasks.TypeVerifyEmailEmail, tasks.VerifyEmailEmailPayload{
		Email: body.Email,
		Url:   url,
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}

func (s *handlers) HandlerVerifyEmail(c echo.Context) error {
	code := c.QueryParam("code")

	if code == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errMalformedOrMissingVerifyCode.Error())
	}

	key := fmt.Sprintf("verify-email:%s", code)

	if !s.cache.Has(key) {
		return echo.NewHTTPError(http.StatusBadRequest, errInvalidOrExpiredVerifyCode.Error())
	}

	email, err := s.cache.Get(key)

	if err != nil {
		return echo.ErrInternalServerError
	}

	user, err := s.service.getUserByEmail(email)

	if err != nil {
		return echo.ErrInternalServerError
	}

	if user.IsEmailVerified {
		return echo.NewHTTPError(http.StatusBadRequest, errEmailAlreadyVerified.Error())
	}

	err = s.service.verifyUserEmail(user.ID)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}

func (s *handlers) HandlerSendForgotPasswordEmail(c echo.Context) error {
	body := c.Get("body").(SendForgotPasswordEmailRequestDto)
	_, err := s.service.getUserByEmail(body.Email)

	if err != nil {
		return echo.ErrInternalServerError
	}

	code, err := random.DigitsString(6)

	if err != nil {
		return echo.ErrInternalServerError
	}

	key := fmt.Sprintf("forgot-password:%s", code)
	s.cache.Set(key, body.Email, time.Minute*15)

	_, err = s.tasks.CreateAndEnqueue(tasks.TypeForgotPasswordEmail, tasks.ForgotPasswordEmailPayload{
		Email: body.Email,
		Code:  code,
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}

func (s *handlers) HandlerResetPassword(c echo.Context) error {
	body := c.Get("body").(ResetPasswordRequestDto)
	user, err := s.service.getUserByEmail(body.Email)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, errInvalidEmail.Error())
	}

	key := fmt.Sprintf("forgot-password:%s", body.Code)
	cacheVal, err := s.cache.Get(key)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, errPasswordResetCodeExpiredOrInvalid.Error())
	}

	if cacheVal != body.Email {
		return echo.NewHTTPError(http.StatusBadRequest, errPasswordResetCodeExpiredOrInvalid.Error())
	}

	err = s.service.updateUserPassword(user.ID, body.NewPassword)

	if err != nil {
		return echo.ErrInternalServerError
	}

	err = s.cache.Del(key)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}
