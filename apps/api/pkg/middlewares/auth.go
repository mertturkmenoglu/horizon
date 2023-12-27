package middlewares

import (
	"horizon/pkg/db/query"
	"horizon/pkg/jsonwebtoken"
	"net/http"

	"github.com/labstack/echo/v4"
)

func IsAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookies := c.Request().Cookies()

		var accessTokenCookie *http.Cookie = nil

		for _, cookie := range cookies {
			if cookie.Name == "accessToken" {
				accessTokenCookie = cookie
				break
			}
		}

		if accessTokenCookie == nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Missing access token")
		}

		claims, err := jsonwebtoken.Decode(accessTokenCookie.Value)

		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Malformed access token")
		}

		auth, err := query.GetAuthByEmail(claims.Email)

		if err != nil || auth == nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
		}

		user, err := query.GetUserByEmail(claims.Email)

		if err != nil || user == nil {
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