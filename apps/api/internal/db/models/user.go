package models

import "github.com/google/uuid"

type User struct {
	BaseModel
	AuthId              uuid.UUID          `gorm:"type:uuid;not null;unique" json:"-"`
	Auth                Auth               `json:"-"`
	Name                string             `json:"name"`
	Email               string             `json:"email"`
	Username            string             `json:"username"`
	OnboardingCompleted bool               `json:"onboardingCompleted"`
	EmailVerified       bool               `json:"emailVerified"`
	ContactInformation  ContactInformation `json:"contactInformation"`
	Location            Location           `json:"location"`
	Gender              string             `json:"gender"`
}

type ContactInformation struct {
	BaseModel
	UserId  uuid.UUID `json:"userId"`
	Email   string    `json:"email"`
	Phone   string    `json:"phone"`
	Address string    `json:"address"`
	Other   string    `json:"other"`
}

type Location struct {
	BaseModel
	UserID  uuid.UUID `json:"userId"`
	City    string    `json:"city"`
	Country string    `json:"country"`
	Lat     string    `json:"lat"`
	Long    string    `json:"long"`
}
