package aggregations

import (
	"context"
	"horizon/internal/cache"
	"horizon/internal/db"
	"horizon/internal/h"
	"net/http"
	"sync"

	"github.com/labstack/echo/v4"
)

func (s *Module) HandlerGetHomeAggregations(c echo.Context) error {
	// First check if the cache is available
	var cacheRes GetHomeAggregationsResponseDto

	err := s.Cache.ReadObj(cache.KeyHomeAggregations, &cacheRes)

	// If err is nil, cache is available
	// Return the cached data
	if err == nil {
		return c.JSON(http.StatusOK, h.Response[GetHomeAggregationsResponseDto]{
			Data: cacheRes,
		})
	}

	// Queries to be executed in parallel
	// Each query returns a slice of rows
	// We need to wait for all queries to finish
	// before we can return the data.
	// This is why we use a WaitGroup
	var (
		wg           sync.WaitGroup
		dbNew        []db.GetNewHServicesRow
		dbPopular    []db.GetPopularHServicesRow
		dbFeatured   []db.GetFeaturedHServicesRow
		dbFavorites  []db.GetFavoriteHServicesRow
		errNew       error
		errPopular   error
		errFeatured  error
		errFavorites error
	)

	// Add 4 because we have 4 queries
	wg.Add(4)

	// Execute the queries in parallel
	go func() {
		defer wg.Done()
		dbNew, errNew = s.Db.Queries.GetNewHServices(context.Background())
	}()

	go func() {
		defer wg.Done()
		dbPopular, errPopular = s.Db.Queries.GetPopularHServices(context.Background())
	}()

	go func() {
		defer wg.Done()
		dbFeatured, errFeatured = s.Db.Queries.GetFeaturedHServices(context.Background())
	}()

	go func() {
		defer wg.Done()
		dbFavorites, errFavorites = s.Db.Queries.GetFavoriteHServices(context.Background())
	}()

	// Wait for all queries to finish
	// wg.Done() decrements the WaitGroup counter
	// We set it to 4, each query decrements it by 1
	// When WaitGroup counter reaches 0, all queries are finished, lock is released
	// Continue the code execution
	wg.Wait()

	// If any of the queries failed, return an error
	if errNew != nil || errPopular != nil || errFeatured != nil || errFavorites != nil {
		return echo.ErrInternalServerError
	}

	// Map database results to DTOs
	resNew, errNew := mapNewHServicesToDtos(dbNew)
	resPopular, errPopular := mapPopularHServicesToDtos(dbPopular)
	resFeatured, errFeatured := mapFeaturedHServicesToDtos(dbFeatured)
	resFavorites, errFavorites := mapFavoriteHServicesToDtos(dbFavorites)

	// If any of the mapping functions failed, return an error
	if errNew != nil || errPopular != nil || errFeatured != nil || errFavorites != nil {
		return echo.ErrInternalServerError
	}

	// Create the response DTO
	res := GetHomeAggregationsResponseDto{
		New:       resNew,
		Popular:   resPopular,
		Featured:  resFeatured,
		Favorites: resFavorites,
	}

	// Try to set the cache
	err = s.Cache.SetObj(cache.KeyHomeAggregations, res, cache.TTLHomeAggregations)

	// If cache setting failed, return an error
	if err != nil {
		return echo.ErrInternalServerError
	}

	// Return the response
	return c.JSON(http.StatusOK, h.Response[GetHomeAggregationsResponseDto]{
		Data: res,
	})
}
