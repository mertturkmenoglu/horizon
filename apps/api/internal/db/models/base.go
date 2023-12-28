package models

import (
	"time"

	"github.com/google/uuid"
)

type BaseModel struct {
	Id        uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
	DeletedAt time.Time `json:"-" sql:"index"`
}
