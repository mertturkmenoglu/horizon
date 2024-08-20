package auth

import (
	"context"
	"horizon/config"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/hash"
	"horizon/internal/tasks"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
)

type AuthService struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Logger *pterm.Logger
	Tasks  *tasks.Tasks
}

func NewAuthService(db *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger, tasks *tasks.Tasks) *AuthService {
	return &AuthService{
		Db:     db,
		Flake:  flake,
		Logger: logger,
		Tasks:  tasks,
	}
}

func (s *AuthService) HandlerGoogle(c echo.Context) error {
	googleConfig := getGoogleOAuth2Config()
	state := generateStateString()
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess.Values["state"] = state

	sess.Save(c.Request(), c.Response())

	url := googleConfig.AuthCodeURL(state)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (s *AuthService) HandlerGoogleCallback(c echo.Context) error {
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

	sess.Options = getAuthSessionOptions()
	sess.Values["user_id"] = authId
	sess.Save(c.Request(), c.Response())
	redirectUrl := viper.GetString(config.GOOGLE_REDIRECT)

	return c.Redirect(http.StatusTemporaryRedirect, redirectUrl)
}

func (s *AuthService) HandlerGetMe(c echo.Context) error {
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

func (s *AuthService) HandlerLogout(c echo.Context) error {
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

func (s *AuthService) HandlerCredentialsLogin(c echo.Context) error {
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

	sess.Options = getAuthSessionOptions()

	sess.Values["user_id"] = user.ID
	sess.Save(c.Request(), c.Response())

	return c.NoContent(http.StatusOK)

}

func (s *AuthService) HandlerCredentialsRegister(c echo.Context) error {
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
