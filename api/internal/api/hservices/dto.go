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
	Media            string  `json:"media"`
}

// UserResponseDto
// @Description Basic user information
type UserResponseDto struct {
	ID           string    `json:"id" example:"528696135489945615"`
	Username     string    `json:"username" example:"johndoe"`
	FullName     string    `json:"fullName" example:"John Doe"`
	Gender       *string   `json:"gender" example:"male"`
	ProfileImage *string   `json:"profileImage" example:"https://example.com/image.jpg"`
	CreatedAt    time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00"`
}

// HServiceResponseDto
// @Description Basic service information with user information
type HServiceResponseDto struct {
	ID               string          `json:"id" example:"7234882566245847040"`
	UserID           string          `json:"userId" example:"528696135489945615"`
	User             UserResponseDto `json:"user"`
	Title            string          `json:"title" example:"Example Service"`
	Slug             string          `json:"slug" example:"example-service"`
	Description      string          `json:"description" example:"Example service description"`
	Category         int32           `json:"category" example:"1"`
	Price            float64         `json:"price"	example:"10"`
	PriceUnit        string          `json:"priceUnit" example:"USD"`
	PriceTimespan    string          `json:"priceTimespan" example:"HOURLY"`
	IsOnline         bool            `json:"isOnline" example:"true"`
	Url              *string         `json:"url" example:"https://example.com"`
	Location         string          `json:"location" example:"Example Location"`
	DeliveryTime     int32           `json:"deliveryTime" example:"1"`
	DeliveryTimespan string          `json:"deliveryTimespan" example:"HOURLY"`
	TotalPoints      int64           `json:"totalPoints" example:"50"`
	TotalVotes       int32           `json:"totalVotes" example:"10"`
	Media            map[string]any  `json:"media"`
	CreatedAt        time.Time       `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00"`
	UpdatedAt        time.Time       `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00"`
}

// HServiceWithoutUserResponseDto
// @Description Basic service information without user information
type HServiceWithoutUserResponseDto struct {
	ID               string         `json:"id" example:"7234882566245847040"`
	UserID           string         `json:"userId" example:"528696135489945615"`
	Title            string         `json:"title" example:"Example Service"`
	Slug             string         `json:"slug" example:"example-service"`
	Description      string         `json:"description" example:"Example service description"`
	Category         int32          `json:"category" example:"1"`
	Price            float64        `json:"price" example:"10"`
	PriceUnit        string         `json:"priceUnit" example:"USD"`
	PriceTimespan    string         `json:"priceTimespan" example:"HOURLY"`
	IsOnline         bool           `json:"isOnline" example:"true"`
	Url              *string        `json:"url" example:"https://example.com"`
	Location         string         `json:"location" example:"Example Location"`
	DeliveryTime     int32          `json:"deliveryTime" example:"1"`
	DeliveryTimespan string         `json:"deliveryTimespan" example:"HOURLY"`
	TotalPoints      int64          `json:"totalPoints" example:"50"`
	TotalVotes       int32          `json:"totalVotes" example:"10"`
	Media            map[string]any `json:"media"`
	CreatedAt        time.Time      `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00"`
	UpdatedAt        time.Time      `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00"`
}

// HServiceMetadataDto
// @Description HServiceMetadataDto
type HServiceMetadataDto struct {
	IsFavorite   bool `json:"isFavorite" example:"true"`
	IsBookmarked bool `json:"isBookmarked" example:"true"`
}
