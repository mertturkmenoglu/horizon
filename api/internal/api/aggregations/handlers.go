package aggregations

import (
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *handlers) HandlerGetHomeAggregations(c echo.Context) error {
	cacheRes, err := s.service.checkCacheHomeAggregations()

	if err == nil {
		return c.JSON(http.StatusOK, h.Response[GetHomeAggregationsResponseDto]{
			Data: *cacheRes,
		})
	}

	res, err := s.service.getHomeAggregations()

	if err != nil {
		return echo.ErrInternalServerError
	}

	err = s.service.setCacheHomeAggregations(res)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[GetHomeAggregationsResponseDto]{
		Data: *res,
	})
}
