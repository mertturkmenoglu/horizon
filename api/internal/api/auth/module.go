package auth

import (
	"horizon/internal/cache"
	"horizon/internal/db"
	"horizon/internal/tasks"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type Module struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Logger *pterm.Logger
	Tasks  *tasks.Tasks
	Cache  *cache.Cache
}

func New(db *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger, tasks *tasks.Tasks, cache *cache.Cache) *Module {
	return &Module{
		Db:     db,
		Flake:  flake,
		Logger: logger,
		Tasks:  tasks,
		Cache:  cache,
	}
}
