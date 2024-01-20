package models

import (
	"github.com/google/uuid"
	"gorm.io/datatypes"
)

type User struct {
	BaseModel
	AuthId              uuid.UUID          `json:"-" gorm:"type:uuid;not null;uniqueIndex"`
	Auth                Auth               `json:"-"`
	Name                string             `json:"name" gorm:"not null;size:64;default:''"`
	Email               string             `json:"email" gorm:"not null;uniqueIndex;size:256"`
	Username            string             `json:"username" gorm:"not null;uniqueIndex:,sort:desc;size:32"`
	OnboardingCompleted bool               `json:"onboardingCompleted" gorm:"not null;default:false"`
	EmailVerified       bool               `json:"emailVerified" gorm:"not null;default:false"`
	ContactInformation  ContactInformation `json:"contactInformation"`
	Location            Location           `json:"location"`
	Gender              string             `json:"gender" gorm:"not null;size:32;default:''"`
	IsBusinessAccount   bool               `json:"isBusinessAccount" gorm:"not null;default:false"`
	IsVerifiedAccount   bool               `json:"isVerifiedAccount" gorm:"not null;default:false"`
	Description         string             `json:"description" gorm:"not null;default:''"`
	AccountStatus       int                `json:"accountStatus" gorm:"not null;default:0"`
	ProfileImage        string             `json:"profileImage" gorm:"not null;default:''"`
}

type ContactInformation struct {
	BaseModel
	UserId  uuid.UUID                        `json:"userId" gorm:"type:uuid;uniqueIndex;not null"`
	Email   string                           `json:"email" gorm:"size:64"`
	Phone   string                           `json:"phone" gorm:"size:32"`
	Address string                           `json:"address" gorm:"size:128"`
	Other   string                           `json:"other" gorm:"size:256"`
	Links   datatypes.JSONSlice[ContactLink] `json:"links"`
}

type ContactLink struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

type Location struct {
	BaseModel
	UserID  uuid.UUID `json:"userId" gorm:"uniqueIndex;not null"`
	City    string    `json:"city" gorm:"not null;size:32;default:''"`
	Admin   string    `json:"admin" gorm:"size:32;default:''"`
	Country string    `json:"country" gorm:"not null;size:32;default:''"`
	Lat     string    `json:"lat" gorm:"not null;size:32;default:''"`
	Long    string    `json:"long" gorm:"not null;size:32;default:''"`
}
