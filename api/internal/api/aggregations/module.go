package aggregations

import (
	"horizon/internal/cache"
	"horizon/internal/db"
)

type Module struct {
	handlers *handlers
}

type handlers struct {
	service *service
}

type service struct {
	repository *repository
	cache      *cache.Cache
}

type repository struct {
	db *db.Db
}

func New(database *db.Db, cache *cache.Cache) *Module {
	repository := repository{
		db: database,
	}

	service := service{
		repository: &repository,
		cache:      cache,
	}

	handlers := &handlers{
		service: &service,
	}

	return &Module{
		handlers: handlers,
	}
}
