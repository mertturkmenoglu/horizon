package models

import (
	"time"

	"github.com/google/uuid"
)

type Service struct {
	Id               string    `gorm:"not null;uniqueIndex;autoIncrement:false;default:''"`
	CreatedAt        time.Time ``
	UpdatedAt        time.Time `gorm:"default:null"`
	DeletedAt        time.Time `gorm:"default:null"`
	User             User      ``
	UserId           uuid.UUID `gorm:"type:uuid;not null;index"`
	Title            string    `gorm:"not null;size:64;default:'';index"`
	Slug             string    `gorm:"not null;size:64;default:'';index"`
	Description      string    `gorm:"not null;size:4096;default:''"`
	Category         int       `gorm:"not null"`
	Price            string    `gorm:"not null;size:10;default:''"`
	PriceUnit        string    `gorm:"not null;size:5;default:''"`
	PriceTimespan    int       `gorm:"not null;default:0"`
	IsOnline         bool      `gorm:"not null;default:false"`
	Location         string    `gorm:"not null;size:128;default:''"`
	DeliveryTime     int       `gorm:"not null;default:1"`
	DeliveryTimespan int       `gorm:"not null;default:0"`
	Status           int       `gorm:"not null;default:0"`
	Photos           []ServicePhoto
	Videos           []ServiceVideo
}

type ServicePhoto struct {
	BaseModel
	ServiceId string `gorm:"not null;index"`
	Url       string `gorm:"not null"`
	Alt       string `gorm:"not null;size:128"`
}

type ServiceVideo struct {
	BaseModel
	ServiceId string `gorm:"not null;index"`
	Url       string `gorm:"not null"`
	Alt       string `gorm:"not null;size:128"`
}
