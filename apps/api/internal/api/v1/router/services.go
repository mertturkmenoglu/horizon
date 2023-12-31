package router

import (
	categories "horizon/internal/category"
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetServiceCategories(c echo.Context) error {
	return c.JSON(http.StatusOK, h.Response{
		"data": categories.ServiceCategories,
	})
}
