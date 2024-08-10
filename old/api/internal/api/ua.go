package api

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/mileusna/useragent"
)

func FormatUserAgentString(c echo.Context) string {
	ua := useragent.Parse(c.Request().UserAgent())
	return fmt.Sprintf("%s browser %s OS %s device", ua.Name, ua.OS, ua.Device)
}
