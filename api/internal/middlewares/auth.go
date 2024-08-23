package middlewares

import (
	"context"
	"errors"
	"horizon/internal/api/auth"
	"horizon/internal/cookies"
	"horizon/internal/db"
	"horizon/internal/h"
	"net/http"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

var dbClient *db.Db = nil

func GetDb() *db.Db {
	if dbClient == nil {
		dbClient = db.NewDb()
	}
	return dbClient
}

var (
	errInvalidState   = errors.New("invalid session state")
	errInvalidSession = errors.New("invalid session")
	errSessionExpired = errors.New("session expired")
)

// IsAuth checks if the user is authenticated or not.
// If the user is authenticated, it sets the user_id in the context.
// If the user is not authenticated, it throws an HTTP 401 StatusUnauthorized error.
func IsAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, err := session.Get(auth.SESSION_NAME, c)

		if err != nil {
			return c.JSON(http.StatusUnauthorized, h.ErrResponse{
				Message: errInvalidState.Error(),
			})
		}

		userId, sessionId, ok := getValuesFromSession(sess)

		if !ok || sessionId == "" || userId == "" {
			cookies.DeleteSessionCookie(c)

			return c.JSON(http.StatusUnauthorized, h.ErrResponse{
				Message: errInvalidSession.Error(),
			})
		}

		s, err := GetDb().Queries.GetSessionById(context.Background(), sessionId)

		if err != nil {
			cookies.DeleteSessionCookie(c)

			return c.JSON(http.StatusUnauthorized, h.ErrResponse{
				Message: errInvalidSession.Error(),
			})
		}

		// Check if the session belongs to the user
		if s.Session.UserID != userId {
			cookies.DeleteSessionCookie(c)

			return c.JSON(http.StatusUnauthorized, h.ErrResponse{
				Message: errInvalidSession.Error(),
			})
		}

		// Check if the session is expired
		if s.Session.ExpiresAt.Time.Before(time.Now()) {
			cookies.DeleteSessionCookie(c)

			return c.JSON(http.StatusUnauthorized, h.ErrResponse{
				Message: errSessionExpired.Error(),
			})
		}

		c.Set("user_id", userId)
		c.Set("session_id", sessionId)
		c.Set("session_data", s.Session.SessionData)
		c.Set("user", s.User)

		return next(c)
	}
}

// WithAuth checks if the user is authenticated or not.
// If the user is authenticated, it sets the user_id in the context.
// If the user is not authenticated, it sets the user_id to an empty string.
func WithAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, err := session.Get(auth.SESSION_NAME, c)

		if err != nil {
			setContextValuesEmpty(c)
			return next(c)
		}

		userId, sessionId, ok := getValuesFromSession(sess)

		if !ok || userId == "" || sessionId == "" {
			setContextValuesEmpty(c)
			return next(c)
		}

		s, err := GetDb().Queries.GetSessionById(context.Background(), sessionId)
		ok = err == nil && s.Session.UserID == userId && s.Session.ExpiresAt.Time.After(time.Now())

		if !ok {
			setContextValuesEmpty(c)
			return next(c)
		}

		c.Set("user_id", userId)
		c.Set("session_id", sessionId)
		c.Set("session_data", s.Session.SessionData)
		c.Set("user", s.User)

		return next(c)
	}
}

func getValuesFromSession(sess *sessions.Session) (userId string, sessionId string, ok bool) {
	userId, userOk := sess.Values["user_id"].(string)
	sessionId, sessionOk := sess.Values["session_id"].(string)
	ok = userOk && sessionOk
	return userId, sessionId, ok
}

func setContextValuesEmpty(c echo.Context) {
	c.Set("user_id", "")
	c.Set("session_id", "")
	c.Set("session_data", "")
	c.Set("user", db.User{})
}
