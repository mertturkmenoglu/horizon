package models

import (
	"time"

	"github.com/google/uuid"
)

type BaseModel struct {
	Id        uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	DeletedAt time.Time `json:"-" sql:"index"`
}
