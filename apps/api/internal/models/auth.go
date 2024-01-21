package models

import (
	"time"

	"github.com/google/uuid"
)

type Auth struct {
	BaseModel
	Password string `json:"-"`
}

// Activity type values are
//
// 0: Login Attempt
// 1: Logout
// 2: Password change
// 3: Password reset
// 4: Email verification
type AuthActivity struct {
	Id           uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	AuthId       uuid.UUID `json:"-" gorm:"index;not null"`
	Auth         Auth      `json:"-"`
	ActivityType int       `json:"activityType" gorm:"not null;size:8;default:0"`
	CreatedAt    time.Time `json:"createdAt"`
	IpAddress    string    `json:"ipAddress"`
	UserAgent    string    `json:"userAgent"`
	Location     string    `json:"location"`
	Success      bool      `json:"success"`
}
