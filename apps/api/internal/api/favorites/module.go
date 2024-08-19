package favorites

import (
	"horizon/internal/cache"
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type FavoritesService struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Logger *pterm.Logger
	Cache  *cache.Cache
}

func NewFavoritesService(db *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger, cache *cache.Cache) *FavoritesService {
	return &FavoritesService{
		Db:     db,
		Flake:  flake,
		Logger: logger,
		Cache:  cache,
	}
}
