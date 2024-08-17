package hservices

import (
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type HServicesService struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Logger *pterm.Logger
}

func NewHServicesService(database *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger) *HServicesService {
	return &HServicesService{
		Db:     database,
		Flake:  flake,
		Logger: logger,
	}
}
