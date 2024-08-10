package location

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/geo"
	"horizon/internal/h"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

func SearchLocation(c echo.Context) error {
	var res []geo.SearchResult
	term := c.QueryParam("term")
	cache := api.App.Cache
	key := cache.FmtKey("location-search", term)
	err := api.App.Cache.ReadObj(key, &res)

	if err == nil {
		return c.JSON(http.StatusOK, h.Response[dto.SearchLocationResponse]{
			"data": res,
		})
	}

	results := api.App.Geo.SearchAll(term)
	cache.SetObj(key, results, time.Minute*10)

	return c.JSON(http.StatusOK, h.Response[dto.SearchLocationResponse]{
		"data": results,
	})
}
