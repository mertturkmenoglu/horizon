package middlewares

import (
	"horizon/internal/api"
	"horizon/internal/jsonwebtoken"
	"horizon/internal/query"

	"github.com/labstack/echo/v4"
)

func IsAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		accessCookie := api.GetCookieFromReq(c, "accessToken")
		refreshCookie := api.GetCookieFromReq(c, "refreshToken")

		if accessCookie == nil || refreshCookie == nil {
			return api.NewUnauthorizedError("Missing token")
		}

		claims, err := jsonwebtoken.Decode(accessCookie.Value)

		if err != nil {
			return api.NewUnauthorizedError("Malformed token")
		}

		auth, user, err := query.GetAuthAndUserByEmail(claims.Email)

		if err != nil || auth == nil || user == nil {
			return api.NewUnauthorizedError("Invalid credentials")
		}

		key := api.App.Cache.FmtKey("refreshToken", refreshCookie.Value)
		cacheValue, err := api.App.Cache.Get(key)

		if err != nil || cacheValue != user.Email {
			return api.NewUnauthorizedError("Invalid credentials")
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
