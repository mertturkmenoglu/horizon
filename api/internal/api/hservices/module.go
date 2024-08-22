package hservices

import (
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type Module struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Logger *pterm.Logger
}

func New(database *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger) *Module {
	return &Module{
		Db:     database,
		Flake:  flake,
		Logger: logger,
	}
}
