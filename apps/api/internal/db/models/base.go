package models

import (
	"time"

	"github.com/google/uuid"
)

type BaseModel struct {
	Id        uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	CreatedAt time.Time `json:"-" gorm:"index:,sort:desc"`
	UpdatedAt time.Time `json:"-" gorm:"index:,sort:desc"`
	DeletedAt time.Time `json:"-" gorm:"default:null"`
}
