package reviews

import (
	"horizon/internal/cache"
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type Module struct {
	Db     *db.Db
	Logger *pterm.Logger
	Flake  *sonyflake.Sonyflake
	Cache  *cache.Cache
}

func New(db *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger, cache *cache.Cache) *Module {
	return &Module{
		Db:     db,
		Logger: logger,
		Flake:  flake,
		Cache:  cache,
	}
}
