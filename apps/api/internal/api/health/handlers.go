package health

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *HealthService) HandlerGetHealth(c echo.Context) error {
	return c.JSON(http.StatusOK, GetHealthResponseDto{
		Message: "OK",
	})
}