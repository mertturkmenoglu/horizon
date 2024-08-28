package bookmarks

import (
	"horizon/internal/cache"
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type Module struct {
	handlers *handlers
}

type handlers struct {
	service *service
	logger  *pterm.Logger
}

type service struct {
	repository *repository
	cache      *cache.Cache
}

type repository struct {
	db    *db.Db
	flake *sonyflake.Sonyflake
}

func New(database *db.Db, flake *sonyflake.Sonyflake, cache *cache.Cache, logger *pterm.Logger) *Module {
	repository := repository{
		db:    database,
		flake: flake,
	}

	service := service{
		repository: &repository,
		cache:      cache,
	}

	handlers := &handlers{
		service: &service,
		logger:  logger,
	}

	return &Module{
		handlers: handlers,
	}
}
