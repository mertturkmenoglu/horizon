package bookmarks

import (
	"horizon/internal/cache"
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type BookmarksService struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Cache  *cache.Cache
	Logger *pterm.Logger
}

func NewBookmarksService(database *db.Db, flake *sonyflake.Sonyflake, cache *cache.Cache, logger *pterm.Logger) *BookmarksService {
	return &BookmarksService{
		Db:     database,
		Flake:  flake,
		Cache:  cache,
		Logger: logger,
	}
}
