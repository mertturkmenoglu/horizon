package middlewares

import (
	"github.com/labstack/echo/v4"
)

func GetLocaleFromHeader(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		headerAcceptLanguage := c.Request().Header.Get("Accept-Language")
		lang := "en"

		if headerAcceptLanguage == "tr" {
			lang = "tr"
		}

		c.Set("lang", lang)

		return next(c)
	}
}
