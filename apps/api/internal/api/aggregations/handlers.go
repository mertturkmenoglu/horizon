package aggregations

import (
	"context"
	"horizon/internal/cache"
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *AggregationsService) HandlerGetHomeAggregations(c echo.Context) error {
	var cacheRes GetHomeAggregationsResponseDto

	err := s.Cache.ReadObj(cache.KeyHomeAggregations, &cacheRes)

	if err == nil {
		return c.JSON(http.StatusOK, h.Response[GetHomeAggregationsResponseDto]{
			"data": cacheRes,
		})
	}

	dbNew, errNew := s.Db.Queries.GetNewHServices(context.Background())
	dbPopular, errPopular := s.Db.Queries.GetPopularHServices(context.Background())
	dbFeatured, errFeatured := s.Db.Queries.GetFeaturedHServices(context.Background())
	dbFavorites, errFavorites := s.Db.Queries.GetFavoriteHServices(context.Background())

	if errNew != nil || errPopular != nil || errFeatured != nil || errFavorites != nil {
		return echo.ErrInternalServerError
	}

	resNew, errNew := mapNewHServicesToDtos(dbNew)
	resPopular, errPopular := mapPopularHServicesToDtos(dbPopular)
	resFeatured, errFeatured := mapFeaturedHServicesToDtos(dbFeatured)
	resFavorites, errFavorites := mapFavoriteHServicesToDtos(dbFavorites)

	if errNew != nil || errPopular != nil || errFeatured != nil || errFavorites != nil {
		return echo.ErrInternalServerError
	}

	res := GetHomeAggregationsResponseDto{
		New:       resNew,
		Popular:   resPopular,
		Featured:  resFeatured,
		Favorites: resFavorites,
	}

	err = s.Cache.SetObj(cache.KeyHomeAggregations, res, cache.TTLHomeAggregations)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[GetHomeAggregationsResponseDto]{
		"data": res,
	})
}
