package models

import (
	"time"

	"github.com/google/uuid"
)

type Auth struct {
	BaseModel
	Password string `json:"-"`
}

type AuthActivity struct {
	Id        uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	AuthId    uuid.UUID `json:"-"`
	Auth      Auth      `json:"-"`
	CreatedAt time.Time `json:"createdAt"`
	IpAddress string    `json:"ipAddress"`
	Location  string    `json:"location"`
	Success   bool      `json:"success"`
}
