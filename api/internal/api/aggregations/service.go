package aggregations

import (
	"horizon/internal/cache"
	"horizon/internal/db"
	"sync"
)

func (s *service) checkCacheHomeAggregations() (*GetHomeAggregationsResponseDto, error) {
	// First check if the cache is available
	var cacheRes GetHomeAggregationsResponseDto

	err := s.cache.ReadObj(cache.KeyHomeAggregations, &cacheRes)

	// If err is nil, cache is available
	// Return the cached data
	if err == nil {
		return &cacheRes, nil
	}

	return nil, err
}

func (s *service) getHomeAggregations() (*GetHomeAggregationsResponseDto, error) {
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

	wg.Add(4)

	go func() {
		defer wg.Done()
		dbNew, errNew = s.repository.getNewHServices()
	}()

	go func() {
		defer wg.Done()
		dbPopular, errPopular = s.repository.getPopularHServices()
	}()

	go func() {
		defer wg.Done()
		dbFeatured, errFeatured = s.repository.getFeaturedHServices()
	}()

	go func() {
		defer wg.Done()
		dbFavorites, errFavorites = s.repository.getFavoriteHServices()
	}()

	// Wait for all queries to finish
	wg.Wait()

	if errNew != nil || errPopular != nil || errFeatured != nil || errFavorites != nil {
		return nil, errNew
	}

	resNew, errNew := mapNewHServicesToDtos(dbNew)
	resPopular, errPopular := mapPopularHServicesToDtos(dbPopular)
	resFeatured, errFeatured := mapFeaturedHServicesToDtos(dbFeatured)
	resFavorites, errFavorites := mapFavoriteHServicesToDtos(dbFavorites)

	if errNew != nil || errPopular != nil || errFeatured != nil || errFavorites != nil {
		return nil, errNew
	}

	// Create the response DTO
	res := GetHomeAggregationsResponseDto{
		New:       resNew,
		Popular:   resPopular,
		Featured:  resFeatured,
		Favorites: resFavorites,
	}

	return &res, nil
}

func (s *service) setCacheHomeAggregations(res *GetHomeAggregationsResponseDto) error {
	return s.cache.SetObj(cache.KeyHomeAggregations, res, cache.TTLHomeAggregations)
}
