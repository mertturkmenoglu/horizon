package lists

import (
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
}

type repository struct {
	db    *db.Db
	flake *sonyflake.Sonyflake
}

func New(db *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger) *Module {
	repository := repository{
		db:    db,
		flake: flake,
	}

	service := service{
		repository: &repository,
	}

	handlers := &handlers{
		service: &service,
		logger:  logger,
	}

	return &Module{
		handlers: handlers,
	}
}
