package favorites

import (
	"horizon/internal/cache"
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type Module struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Logger *pterm.Logger
	Cache  *cache.Cache
}

func New(db *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger, cache *cache.Cache) *Module {
	return &Module{
		Db:     db,
		Flake:  flake,
		Logger: logger,
		Cache:  cache,
	}
}
