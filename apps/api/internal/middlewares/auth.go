package middlewares

import (
	"horizon/internal/api/auth"
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

func IsAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, err := session.Get(auth.SESSION_NAME, c)

		if err != nil {
			return echo.ErrInternalServerError
		}

		userId, ok := sess.Values["user_id"].(string)
		if !ok || userId == "" {
			return c.JSON(http.StatusUnauthorized, h.ErrResponse{
				Message: "Invalid session state",
			})
		}

		c.Set("user_id", userId)
		return next(c)
	}
}
