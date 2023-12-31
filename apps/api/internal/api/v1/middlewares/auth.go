package middlewares

import (
	"fmt"
	"horizon/internal/cache"
	"horizon/internal/db/query"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"net/http"

	"github.com/labstack/echo/v4"
)

func IsAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		accessCookie := h.GetCookieFromReq(c, "accessToken")
		refreshCookie := h.GetCookieFromReq(c, "refreshToken")

		if accessCookie == nil || refreshCookie == nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Missing token")
		}

		claims, err := jsonwebtoken.Decode(accessCookie.Value)

		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Malformed token")
		}

		auth, authErr := query.GetAuthByEmail(claims.Email)
		user, userErr := query.GetUserByEmail(claims.Email)

		if authErr != nil || auth == nil || userErr != nil || user == nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
		}

		key := fmt.Sprintf("refreshToken:%s", refreshCookie.Value)
		cacheValue, err := cache.Get(key)

		if err != nil || cacheValue != user.Email {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
		}

		payload := jsonwebtoken.Payload{
			AuthId:   auth.Id.String(),
			UserId:   user.Id.String(),
			Name:     user.Name,
			Email:    user.Email,
			Username: user.Username,
		}

		c.Set("auth", payload)
		return next(c)
	}
}
