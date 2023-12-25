package middlewares

import (
	"fmt"
	"horizon/pkg/db/query"
	"horizon/pkg/jsonwebtoken"
	"net/http"
	"strings"

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

		fullName := strings.TrimSpace(fmt.Sprintf("%s %s", auth.FirstName, auth.LastName))

		payload := jsonwebtoken.Payload{
			AuthId:   auth.Id.String(),
			UserId:   "",
			FullName: fullName,
			Email:    auth.Email,
		}

		c.Set("auth", payload)
		return next(c)
	}
}
