package router

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/geo"
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func SearchLocation(c echo.Context) error {
	term := c.QueryParam("term")

	results := geo.SearchAll(term)

	return c.JSON(http.StatusOK, h.Response[dto.SearchLocationResponse]{
		"data": results,
	})
}
