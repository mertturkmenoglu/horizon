package lists

import (
	"horizon/internal/db"

	"github.com/sony/sonyflake"
)

type Module struct {
	Db    *db.Db
	Flake *sonyflake.Sonyflake
}

func New(db *db.Db, flake *sonyflake.Sonyflake) *Module {
	return &Module{
		Db:    db,
		Flake: flake,
	}
}
