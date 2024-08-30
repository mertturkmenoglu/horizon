package hservices

import (
	"time"
)

// CreateHServiceRequestDto
// @Description CreateHServiceRequestDto
type CreateHServiceRequestDto struct {
	Title            string  `json:"title" validate:"required,min=5,max=64" example:"Example Service" minLength:"5" maxLength:"64"`
	Description      string  `json:"description" validate:"required,min=5,max=4096" example:"Example service description" minLength:"5" maxLength:"4096"`
	Category         int     `json:"category" validate:"required,min=1,max=32" example:"1" min:"1" max:"32"`
	Price            float64 `json:"price" validate:"required,min=1,max=10000" example:"10" min:"1" max:"10000"`
	PriceUnit        string  `json:"priceUnit" validate:"required" example:"USD"`
	PriceTimespan    string  `json:"priceTimespan" validate:"required" example:"HOURLY"`
	IsOnline         *bool   `json:"isOnline" validate:"required" example:"true"`
	Url              *string `json:"url" example:"https://example.com"`
	Location         string  `json:"location" validate:"required,min=1,max=256" example:"Example Location" minLength:"1" maxLength:"256"`
	DeliveryTime     int     `json:"deliveryTime" validate:"required,min=1,max=32" example:"1" min:"1" max:"32"`
	DeliveryTimespan string  `json:"deliveryTimespan" validate:"required" example:"HOURLY"`
	Media            string  `json:"media" validate:"required"`
} //@name HServicesCreateHServiceRequestDto

// UserResponseDto
// @Description Basic user information
type UserResponseDto struct {
	ID           string    `json:"id" example:"528696135489945615" validate:"required"`
	Username     string    `json:"username" example:"johndoe" validate:"required"`
	FullName     string    `json:"fullName" example:"John Doe" validate:"required"`
	Gender       *string   `json:"gender" example:"male" validate:"optional"`
	ProfileImage *string   `json:"profileImage" example:"https://example.com/image.jpg" validate:"optional"`
	CreatedAt    time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name HServicesUserResponseDto

// HServiceResponseDto
// @Description Basic service information with user information
type HServiceResponseDto struct {
	ID               string          `json:"id" example:"7234882566245847040" validate:"required"`
	UserID           string          `json:"userId" example:"528696135489945615" validate:"required"`
	User             UserResponseDto `json:"user" validate:"required"`
	Title            string          `json:"title" example:"Example Service" validate:"required"`
	Slug             string          `json:"slug" example:"example-service" validate:"required"`
	Description      string          `json:"description" example:"Example service description" validate:"required"`
	Category         int32           `json:"category" example:"1" validate:"required"`
	Price            float64         `json:"price" example:"10" validate:"required"`
	PriceUnit        string          `json:"priceUnit" example:"USD" validate:"required"`
	PriceTimespan    string          `json:"priceTimespan" example:"HOURLY" validate:"required"`
	IsOnline         bool            `json:"isOnline" example:"true" validate:"required"`
	Url              *string         `json:"url" example:"https://example.com" validate:"optional"`
	Location         string          `json:"location" example:"Example Location" validate:"required"`
	DeliveryTime     int32           `json:"deliveryTime" example:"1" validate:"required"`
	DeliveryTimespan string          `json:"deliveryTimespan" example:"HOURLY" validate:"required"`
	TotalPoints      int64           `json:"totalPoints" example:"50" validate:"required"`
	TotalVotes       int32           `json:"totalVotes" example:"10" validate:"required"`
	Media            map[string]any  `json:"media" validate:"required"`
	CreatedAt        time.Time       `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	UpdatedAt        time.Time       `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name HServicesHServiceResponseDto

// HServiceWithoutUserResponseDto
// @Description Basic service information without user information
type HServiceWithoutUserResponseDto struct {
	ID               string         `json:"id" example:"7234882566245847040" validate:"required"`
	UserID           string         `json:"userId" example:"528696135489945615" validate:"required"`
	Title            string         `json:"title" example:"Example Service" validate:"required"`
	Slug             string         `json:"slug" example:"example-service" validate:"required"`
	Description      string         `json:"description" example:"Example service description" validate:"required"`
	Category         int32          `json:"category" example:"1" validate:"required"`
	Price            float64        `json:"price" example:"10" validate:"required"`
	PriceUnit        string         `json:"priceUnit" example:"USD" validate:"required"`
	PriceTimespan    string         `json:"priceTimespan" example:"HOURLY" validate:"required"`
	IsOnline         bool           `json:"isOnline" example:"true" validate:"required"`
	Url              *string        `json:"url" example:"https://example.com" validate:"optional"`
	Location         string         `json:"location" example:"Example Location" validate:"required"`
	DeliveryTime     int32          `json:"deliveryTime" example:"1" validate:"required"`
	DeliveryTimespan string         `json:"deliveryTimespan" example:"HOURLY" validate:"required"`
	TotalPoints      int64          `json:"totalPoints" example:"50" validate:"required"`
	TotalVotes       int32          `json:"totalVotes" example:"10" validate:"required"`
	Media            map[string]any `json:"media" validate:"required"`
	CreatedAt        time.Time      `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	UpdatedAt        time.Time      `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name HServicesHServiceWithoutUserResponseDto

// HServiceMetadataDto
// @Description HServiceMetadataDto
type HServiceMetadataDto struct {
	IsFavorite   bool `json:"isFavorite" example:"true" validate:"required"`
	IsBookmarked bool `json:"isBookmarked" example:"true" validate:"required"`
} //@name HServicesHServiceMetadataDto
