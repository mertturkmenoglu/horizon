package hservices

import (
	"time"
)

type CreateHServiceRequestDto struct {
	Title            string  `json:"title" validate:"required,min=5,max=64"`
	Description      string  `json:"description" validate:"required,min=5,max=4096"`
	Category         int     `json:"category" validate:"required,min=1,max=32"`
	Price            float64 `json:"price" validate:"required,min=1,max=10000"`
	PriceUnit        string  `json:"priceUnit" validate:"required"`
	PriceTimespan    string  `json:"priceTimespan" validate:"required"`
	IsOnline         *bool   `json:"isOnline" validate:"required"`
	Url              *string `json:"url"`
	Location         string  `json:"location" validate:"required,min=1,max=256"`
	DeliveryTime     int     `json:"deliveryTime" validate:"required,min=1,max=32"`
	DeliveryTimespan string  `json:"deliveryTimespan" validate:"required"`
	Media            string  `json:"media"`
}

type UserResponseDto struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	FullName     string    `json:"fullName"`
	Gender       *string   `json:"gender"`
	ProfileImage *string   `json:"profileImage"`
	CreatedAt    time.Time `json:"createdAt"`
}

type HServiceResponseDto struct {
	ID               string          `json:"id"`
	UserID           string          `json:"userId"`
	User             UserResponseDto `json:"user"`
	Title            string          `json:"title"`
	Slug             string          `json:"slug"`
	Description      string          `json:"description"`
	Category         int32           `json:"category"`
	Price            float64         `json:"price"`
	PriceUnit        string          `json:"priceUnit"`
	PriceTimespan    string          `json:"priceTimespan"`
	IsOnline         bool            `json:"isOnline"`
	Url              *string         `json:"url"`
	Location         string          `json:"location"`
	DeliveryTime     int32           `json:"deliveryTime"`
	DeliveryTimespan string          `json:"deliveryTimespan"`
	TotalPoints      int64           `json:"totalPoints"`
	TotalVotes       int32           `json:"totalVotes"`
	Media            map[string]any  `json:"media"`
	CreatedAt        time.Time       `json:"createdAt"`
	UpdatedAt        time.Time       `json:"updatedAt"`
}

type HServiceWithoutUserResponseDto struct {
	ID               string         `json:"id"`
	UserID           string         `json:"userId"`
	Title            string         `json:"title"`
	Slug             string         `json:"slug"`
	Description      string         `json:"description"`
	Category         int32          `json:"category"`
	Price            float64        `json:"price"`
	PriceUnit        string         `json:"priceUnit"`
	PriceTimespan    string         `json:"priceTimespan"`
	IsOnline         bool           `json:"isOnline"`
	Url              *string        `json:"url"`
	Location         string         `json:"location"`
	DeliveryTime     int32          `json:"deliveryTime"`
	DeliveryTimespan string         `json:"deliveryTimespan"`
	TotalPoints      int64          `json:"totalPoints"`
	TotalVotes       int32          `json:"totalVotes"`
	Media            map[string]any `json:"media"`
	CreatedAt        time.Time      `json:"createdAt"`
	UpdatedAt        time.Time      `json:"updatedAt"`
}

type HServiceMetadataDto struct {
	IsFavorite   bool `json:"isFavorite"`
	IsBookmarked bool `json:"isBookmarked"`
}