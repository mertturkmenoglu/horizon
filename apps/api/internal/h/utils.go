package h

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetCookieFromReq(c echo.Context, cookieName string) *http.Cookie {
	cookies := c.Request().Cookies()

	for _, cookie := range cookies {
		if cookie.Name == cookieName {
			return cookie
		}
	}

	return nil
}
