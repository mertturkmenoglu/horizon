package auth

import (
	"context"
	"encoding/json"
	"horizon/config"
	"horizon/internal/h"
	"net/http"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

type AuthModule struct {
}

func (m *AuthModule) HandlerGoogle(c echo.Context) error {
	googleConfig := GetGoogleOAuth2Config()
	state := GenerateStateString()
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	sess.Values["state"] = state

	sess.Save(c.Request(), c.Response())

	url := googleConfig.AuthCodeURL(state)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (m *AuthModule) HandlerGoogleCallback(c echo.Context) error {
	googleConfig := GetGoogleOAuth2Config()
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	savedState, ok := sess.Values["state"].(string)

	if !ok || savedState == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "Invalid session state",
		})
	}

	receivedState := c.QueryParam("state")

	if receivedState != savedState {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "Invalid state parameter",
		})
	}

	code := c.QueryParam("code")
	token, err := googleConfig.Exchange(context.Background(), code)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "Failed to exchange token " + err.Error(),
		})
	}

	delete(sess.Values, "state")
	sess.Save(c.Request(), c.Response())

	client := googleConfig.Client(context.Background(), token)
	res, err := client.Get(GOOGLE_USER_ENDPOINT)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "Failed to fetch user",
		})
	}

	defer res.Body.Close()

	userInfo := GoogleUser{}

	if err := json.NewDecoder(res.Body).Decode(&userInfo); err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "Failed to parse user",
		})
	}

	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
		Secure:   viper.GetString(config.ENV) != "dev",
		SameSite: http.SameSiteLaxMode,
	}

	sess.Values["user_id"] = userInfo.Id
	sess.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/")
}

func (m *AuthModule) HandlerGetMe(c echo.Context) error {
	sess, err := session.Get(SESSION_NAME, c)

	if err != nil {
		return echo.ErrInternalServerError
	}

	userId, ok := sess.Values["user_id"].(string)
	if !ok || userId == "" {
		return c.JSON(http.StatusUnauthorized, h.ErrResponse{
			Message: "Invalid session state",
		})
	}

	return c.JSON(http.StatusOK, h.AnyResponse{
		"data": userId,
	})
}

func (m *AuthModule) HandlerLogout(c echo.Context) error {
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
