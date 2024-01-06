package api

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/mileusna/useragent"
)

func NewBadRequestError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusBadRequest, message)
}

func NewUnauthorizedError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusUnauthorized, message)
}

func NewContentTooLargeError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusRequestEntityTooLarge, message)
}

func NewTooManyRequestsError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusTooManyRequests, message)
}

func NewInternalServerError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusInternalServerError, message)
}

func FormatUserAgentString(c echo.Context) string {
	ua := useragent.Parse(c.Request().UserAgent())
	return fmt.Sprintf("%s browser %s OS %s device", ua.Name, ua.OS, ua.Device)
}

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
