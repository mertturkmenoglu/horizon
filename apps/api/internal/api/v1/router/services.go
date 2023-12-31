package router

import (
	"horizon/internal/api/v1/dto"
	categories "horizon/internal/category"
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetServiceCategories(c echo.Context) error {
	return c.JSON(http.StatusOK, h.Response[dto.GetServiceCategoriesRespose]{
		"data": categories.ServiceCategories,
	})
}

func GetServices(c echo.Context) error {
	return echo.NewHTTPError(http.StatusNotImplemented)
}
