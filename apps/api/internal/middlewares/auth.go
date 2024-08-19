package middlewares

import (
	"horizon/internal/api/auth"
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

// IsAuth checks if the user is authenticated or not.
// If the user is authenticated, it sets the user_id in the context.
// If the user is not authenticated, it throws an HTTP 401 StatusUnauthorized error.
func IsAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, err := session.Get(auth.SESSION_NAME, c)

		if err != nil {
			return c.JSON(http.StatusUnauthorized, h.ErrResponse{
				Message: "Invalid session state",
			})
		}

		userId, ok := sess.Values["user_id"].(string)
		if !ok || userId == "" {
			return c.JSON(http.StatusUnauthorized, h.ErrResponse{
				Message: "Invalid user_id",
			})
		}

		c.Set("user_id", userId)
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
			c.Set("user_id", "")
			return next(c)
		}

		userId, ok := sess.Values["user_id"].(string)

		if !ok || userId == "" {
			c.Set("user_id", "")
		} else {
			c.Set("user_id", userId)
		}

		return next(c)
	}
}
