package aggregations

import (
	"horizon/internal/cache"
	"horizon/internal/db"

	"github.com/pterm/pterm"
)

type Module struct {
	Db     *db.Db
	Logger *pterm.Logger
	Cache  *cache.Cache
}

func New(database *db.Db, logger *pterm.Logger, cache *cache.Cache) *Module {
	return &Module{
		Db:     database,
		Logger: logger,
		Cache:  cache,
	}
}
