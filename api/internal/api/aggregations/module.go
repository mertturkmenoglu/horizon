package aggregations

import (
	"horizon/internal/cache"
	"horizon/internal/db"

	"github.com/pterm/pterm"
)

type AggregationsService struct {
	Db     *db.Db
	Logger *pterm.Logger
	Cache  *cache.Cache
}

func NewAggregationsService(database *db.Db, logger *pterm.Logger, cache *cache.Cache) *AggregationsService {
	return &AggregationsService{
		Db:     database,
		Logger: logger,
		Cache:  cache,
	}
}
