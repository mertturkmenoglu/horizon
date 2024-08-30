package bookmarks

import (
	"time"
)

// CreateBookmarkRequestDto
// @Description CreateBookmarkRequestDto
type CreateBookmarkRequestDto struct {
	HServiceId string `json:"hserviceId" validate:"required,min=1,max=64" example:"7235190573525635072"`
}

// CreateBookmarkResponseDto
// @Description CreateBookmarkResponseDto
type CreateBookmarkResponseDto struct {
	ID string `json:"id" example:"7235190573525635072"`
}

// HServiceDto
// @Description Basic service information without user information
type HServiceDto struct {
	ID               string         `json:"id" example:"7235190573525635072"`
	UserID           string         `json:"userId" example:"528696135489945615"`
	Title            string         `json:"title" example:"Example Service"`
	Slug             string         `json:"slug" example:"example-service"`
	Description      string         `json:"description" example:"Example service description"`
	Category         int32          `json:"category" example:"1"`
	Price            float64        `json:"price" example:"10.00"`
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
	CreatedAt        *time.Time     `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00"`
	UpdatedAt        *time.Time     `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00"`
}

// BookmarksResponseDto
// @Description Basic bookmark information
type BookmarksResponseDto struct {
	ID         string      `json:"id" example:"7235190573525635072"`
	UserID     string      `json:"userId" example:"528696135489945615"`
	HserviceID string      `json:"hserviceId" example:"7235190573525635072"`
	CreatedAt  time.Time   `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00"`
	HService   HServiceDto `json:"hservice"`
}
