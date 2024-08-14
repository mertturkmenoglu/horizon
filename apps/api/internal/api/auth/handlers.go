package auth

import (
	"context"
	"horizon/config"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/hash"
	"net/http"
	"time"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

type AuthService struct {
	Db *db.Db
}

func NewAuthService(db *db.Db) *AuthService {
	return &AuthService{
		Db: db,
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

	sess.Options = getAuthSessionOptions()
	sess.Values["user_id"] = userInfo.Id
	sess.Save(c.Request(), c.Response())
	redirectUrl := viper.GetString(config.GOOGLE_REDIRECT)

	return c.Redirect(http.StatusTemporaryRedirect, redirectUrl)
}

func (s *AuthService) HandlerGetMe(c echo.Context) error {
	authId := c.Get("auth_id").(string)

	return c.JSON(http.StatusOK, h.AnyResponse{
		"data": authId,
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
	dbAuth, err := s.Db.Queries.GetAuthByEmail(context.Background(), body.Email)
	var hashed = ""

	if err == nil {
		hashed = dbAuth.PasswordHash.String
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
	sess.Values["user_id"] = string(dbAuth.ID.Bytes[:])
	sess.Save(c.Request(), c.Response())

	return c.NoContent(http.StatusOK)

}
