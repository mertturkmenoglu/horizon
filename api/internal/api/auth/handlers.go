package auth

import (
	"context"
	"encoding/base64"
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
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

func (s *Module) HandlerGoogle(c echo.Context) error {
	googleConfig := getGoogleOAuth2Config()
	state, err := generateStateString()

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess.Values["state"] = state

	sess.Save(c.Request(), c.Response())

	url := googleConfig.AuthCodeURL(state)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (s *Module) HandlerGoogleCallback(c echo.Context) error {
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	token, err := getOAuthToken(sess, c.QueryParam("state"), c.QueryParam("code"))

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: err.Error(),
		})
	}

	delete(sess.Values, "state")
	sess.Save(c.Request(), c.Response())

	userInfo, err := fetchGoogleUser(token)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: err.Error(),
		})
	}

	authId, err := getOrCreateAuthId(s, userInfo)

	if err != nil {
		return echo.ErrInternalServerError
	}

	sessionId := uuid.New().String()
	createdAt := time.Now()
	expiresAt := createdAt.Add(time.Hour * 24 * 7)

	_, err = s.Db.Queries.CreateSession(context.Background(), db.CreateSessionParams{
		ID:          sessionId,
		UserID:      authId,
		SessionData: pgtype.Text{},
		CreatedAt:   pgtype.Timestamptz{Time: createdAt, Valid: true},
		ExpiresAt:   pgtype.Timestamptz{Time: expiresAt, Valid: true},
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess.Options = getAuthSessionOptions()
	sess.Values["user_id"] = authId
	sess.Values["session_id"] = sessionId
	sess.Save(c.Request(), c.Response())
	redirectUrl := viper.GetString(config.GOOGLE_REDIRECT)

	return c.Redirect(http.StatusTemporaryRedirect, redirectUrl)
}

func (s *Module) HandlerGetMe(c echo.Context) error {
	userId := c.Get("user_id").(string)

	me, err := s.Db.Queries.GetMe(context.Background(), userId)

	if err != nil {
		s.Logger.WithCaller(true).Debug("GetMe query failed", s.Logger.Args("err", err.Error()))
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[GetMeResponseDto]{
		Data: GetMeResponseDto{
			ID:              me.ID,
			Email:           me.Email,
			Username:        me.Username,
			FullName:        me.FullName,
			GoogleID:        &me.GoogleID.String,
			IsEmailVerified: me.IsEmailVerified,
			IsActive:        me.IsActive,
			Role:            me.Role,
			Gender:          &me.Gender.String,
			ProfileImage:    &me.ProfileImage.String,
			LastLogin:       me.LastLogin.Time,
			CreatedAt:       me.CreatedAt.Time,
			UpdatedAt:       me.UpdatedAt.Time,
		},
	})
}

func (s *Module) HandlerLogout(c echo.Context) error {
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	delete(sess.Values, "user_id")
	sess.Save(c.Request(), c.Response())

	cookie := new(http.Cookie)
	cookie.Name = SESSION_NAME
	cookie.Value = ""
	cookie.Path = "/"
	cookie.Expires = time.Unix(0, 0)
	cookie.MaxAge = -1
	c.SetCookie(cookie)

	return c.NoContent(http.StatusNoContent)
}

func (s *Module) HandlerCredentialsLogin(c echo.Context) error {
	body := c.Get("body").(LoginRequestDto)
	user, err := s.Db.Queries.GetUserByEmail(context.Background(), body.Email)
	var hashed = ""

	if err == nil {
		hashed = user.PasswordHash.String
	}

	matched, err := hash.Verify(body.Password, hashed)

	if !matched || err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrInvalidEmailOrPassword.Error(),
		})
	}

	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	sessionId := uuid.New().String()
	createdAt := time.Now()
	expiresAt := createdAt.Add(time.Hour * 24 * 7)

	_, err = s.Db.Queries.CreateSession(context.Background(), db.CreateSessionParams{
		ID:          sessionId,
		UserID:      user.ID,
		SessionData: pgtype.Text{},
		CreatedAt:   pgtype.Timestamptz{Time: createdAt, Valid: true},
		ExpiresAt:   pgtype.Timestamptz{Time: expiresAt, Valid: true},
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess.Options = getAuthSessionOptions()

	sess.Values["user_id"] = user.ID
	sess.Values["session_id"] = sessionId
	sess.Save(c.Request(), c.Response())

	return c.NoContent(http.StatusOK)

}

func (s *Module) HandlerCredentialsRegister(c echo.Context) error {
	body := c.Get("body").(RegisterRequestDto)

	// Check if email is taken
	dbAuth, err := s.Db.Queries.GetUserByEmail(context.Background(), body.Email)

	if err == nil && dbAuth.Email != "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrEmailTaken.Error(),
		})
	}

	// Check if username is taken
	dbUser, err := s.Db.Queries.GetUserByUsername(context.Background(), body.Username)

	if err == nil && dbUser.Username != "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrUsernameTaken.Error(),
		})
	}

	// Check username characters
	ok := isValidUsername(body.Username)

	if !ok {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrUsernameChars.Error(),
		})
	}

	// Hash password
	hashed, err := hash.Hash(body.Password)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, h.ErrResponse{
			Message: ErrHash.Error(),
		})
	}

	// Create user
	saved, err := s.Db.Queries.CreateUser(context.Background(), db.CreateUserParams{
		ID:              h.GenerateId(s.Flake),
		Email:           body.Email,
		FullName:        body.FullName,
		Username:        body.Username,
		ProfileImage:    pgtype.Text{},
		PasswordHash:    pgtype.Text{String: hashed, Valid: true},
		GoogleID:        pgtype.Text{},
		IsEmailVerified: false,
	})

	if err != nil {
		return c.JSON(http.StatusInternalServerError, h.ErrResponse{
			Message: "cannot create user",
		})
	}

	s.Tasks.CreateAndEnqueue(tasks.TypeWelcomeEmail, tasks.WelcomeEmailPayload{
		Email: body.Email,
		Name:  body.FullName,
	})

	return c.JSON(http.StatusCreated, h.AnyResponse{
		"data": saved.ID,
	})
}

func (s *Module) HandlerSendVerificationEmail(c echo.Context) error {
	body := c.Get("body").(SendVerificationEmailRequestDto)
	user, err := s.Db.Queries.GetUserByEmail(context.Background(), body.Email)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrInvalidEmail.Error(),
		})
	}

	if user.IsEmailVerified {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrEmailAlreadyVerified.Error(),
		})
	}

	codeBytes, err := random.GenerateBytes(32)
	code := base64.URLEncoding.EncodeToString(codeBytes)

	if err != nil {
		return echo.ErrInternalServerError
	}

	key := fmt.Sprintf("verify-email:%s", code)
	s.Cache.Set(key, body.Email, time.Minute*15)

	url := fmt.Sprintf("%s/api/auth/verify-email/verify?code=%s", viper.GetString(config.API_URL), code)

	_, err = s.Tasks.CreateAndEnqueue(tasks.TypeVerifyEmailEmail, tasks.VerifyEmailEmailPayload{
		Email: body.Email,
		Url:   url,
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}

func (s *Module) HandlerVerifyEmail(c echo.Context) error {
	code := c.QueryParam("code")

	if code == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrMalformedOrMissingVerifyCode.Error(),
		})
	}

	key := fmt.Sprintf("verify-email:%s", code)

	if !s.Cache.Has(key) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrInvalidOrExpiredVerifyCode.Error(),
		})
	}

	email, err := s.Cache.Get(key)

	if err != nil {
		return echo.ErrInternalServerError
	}

	user, err := s.Db.Queries.GetUserByEmail(context.Background(), email)

	if err != nil {
		return echo.ErrInternalServerError
	}

	if user.IsEmailVerified {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: ErrEmailAlreadyVerified.Error(),
		})
	}

	err = s.Db.Queries.UpdateUserIsEmailVerified(context.Background(), user.ID)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}

func (s *Module) HandlerSendForgotPasswordEmail(c echo.Context) error {
	body := c.Get("body").(SendForgotPasswordEmailRequestDto)
	_, err := s.Db.Queries.GetUserByEmail(context.Background(), body.Email)

	if err != nil {
		return echo.ErrInternalServerError
	}

	codeBytes, err := random.GenerateBytes(32)
	code := base64.URLEncoding.EncodeToString(codeBytes)

	if err != nil {
		return echo.ErrInternalServerError
	}

	key := fmt.Sprintf("forgot-password:%s", code)
	s.Cache.Set(key, body.Email, time.Minute*15)

	_, err = s.Tasks.CreateAndEnqueue(tasks.TypeForgotPasswordEmail, tasks.ForgotPasswordEmailPayload{
		Email: body.Email,
		Code:  code,
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}
