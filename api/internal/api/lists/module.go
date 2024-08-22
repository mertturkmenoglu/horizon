package lists

import (
	"horizon/internal/db"

	"github.com/sony/sonyflake"
)

type ListsService struct {
	Db    *db.Db
	Flake *sonyflake.Sonyflake
}

func NewListsService(db *db.Db, flake *sonyflake.Sonyflake) *ListsService {
	return &ListsService{
		Db:    db,
		Flake: flake,
	}
}
