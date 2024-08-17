package users

import (
	"horizon/internal/db"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type UsersService struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Logger *pterm.Logger
}

func NewUsersService(database *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger) *UsersService {
	return &UsersService{
		Db:     database,
		Flake:  flake,
		Logger: logger,
	}
}
