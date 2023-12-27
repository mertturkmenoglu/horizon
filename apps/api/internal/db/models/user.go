package models

import "github.com/google/uuid"

type User struct {
	BaseModel
	AuthId              uuid.UUID `gorm:"type:uuid;not null;unique" json:"-"`
	Auth                Auth      `json:"-"`
	Name                string    `json:"name"`
	Email               string    `json:"email"`
	Username            string    `json:"username"`
	OnboardingCompleted bool      `json:"onboardingCompleted"`
}
