package auth

import (
	"horizon/internal/cache"
	"horizon/internal/db"
	"horizon/internal/tasks"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type Module struct {
	Handlers *handlers
}

type handlers struct {
	service *service
	logger  *pterm.Logger
	flake   *sonyflake.Sonyflake
	cache   *cache.Cache
	tasks   *tasks.Tasks
}

type service struct {
	repository *repository
}

type repository struct {
	db    *db.Db
	flake *sonyflake.Sonyflake
}

func New(db *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger, cache *cache.Cache, tasks *tasks.Tasks) *Module {
	repository := repository{
		db:    db,
		flake: flake,
	}

	service := service{
		repository: &repository,
	}

	handlers := &handlers{
		service: &service,
		flake:   flake,
		logger:  logger,
		cache:   cache,
		tasks:   tasks,
	}

	return &Module{
		Handlers: handlers,
	}
}
