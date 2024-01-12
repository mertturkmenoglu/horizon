package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// Extracts the cookie with the name cookieName from the Echo context
func GetCookieFromReq(c echo.Context, cookieName string) *http.Cookie {
	cookies := c.Request().Cookies()

	for _, cookie := range cookies {
		if cookie.Name == cookieName {
			return cookie
		}
	}

	return nil
}
