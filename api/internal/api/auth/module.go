package auth

import (
	"horizon/internal/db"
	"horizon/internal/tasks"

	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
)

type AuthService struct {
	Db     *db.Db
	Flake  *sonyflake.Sonyflake
	Logger *pterm.Logger
	Tasks  *tasks.Tasks
}

func NewAuthService(db *db.Db, flake *sonyflake.Sonyflake, logger *pterm.Logger, tasks *tasks.Tasks) *AuthService {
	return &AuthService{
		Db:     db,
		Flake:  flake,
		Logger: logger,
		Tasks:  tasks,
	}
}
