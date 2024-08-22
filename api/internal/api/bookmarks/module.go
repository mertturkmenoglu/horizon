package bookmarks

import (
	"horizon/internal/cache"
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type Module struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Cache  *cache.Cache
	Logger *pterm.Logger
}

func New(database *db.Db, flake *sonyflake.Sonyflake, cache *cache.Cache, logger *pterm.Logger) *Module {
	return &Module{
		Db:     database,
		Flake:  flake,
		Cache:  cache,
		Logger: logger,
	}
}
