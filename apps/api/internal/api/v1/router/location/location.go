package location

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/cache"
	"horizon/internal/geo"
	"horizon/internal/h"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

func SearchLocation(c echo.Context) error {
	term := c.QueryParam("term")
	res, err := cache.GetObj[[]geo.SearchResult]("location-search:" + term)

	if err == nil {
		return c.JSON(http.StatusOK, h.Response[dto.SearchLocationResponse]{
			"data": *res,
		})
	}

	results := geo.SearchAll(term)
	cache.SetObj[[]geo.SearchResult]("location-search:"+term, results, time.Minute*10)

	return c.JSON(http.StatusOK, h.Response[dto.SearchLocationResponse]{
		"data": results,
	})
}
