package favorites

import "time"

// CreateFavoriteRequestDto
// @Description CreateFavoriteRequestDto
type CreateFavoriteRequestDto struct {
	HServiceId string `json:"hserviceId" validate:"required,min=1,max=64" example:"7235190573525635072"`
} //@name FavoritesCreateFavoriteRequestDto

// CreateFavoriteResponseDto
// @Description CreateFavoriteResponseDto
type CreateFavoriteResponseDto struct {
	ID string `json:"id" example:"7235190573525635072" validate:"required"`
} //@name FavoritesCreateFavoriteResponseDto

// HServiceDto
// @Description Basic service information without user information
type HServiceDto struct {
	ID               string         `json:"id" example:"7235190573525635072" validate:"required"`
	UserID           string         `json:"userId" example:"528696135489945615" validate:"required"`
	Title            string         `json:"title" example:"Example Service" validate:"required"`
	Slug             string         `json:"slug" example:"example-service" validate:"required"`
	Description      string         `json:"description" example:"Example service description" validate:"required"`
	Category         int32          `json:"category" example:"1" validate:"required"`
	Price            float64        `json:"price" example:"10.00" validate:"required"`
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
	CreatedAt        *time.Time     `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	UpdatedAt        *time.Time     `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name FavoritesHServiceDto

// FavoritesResponseDto
// @Description Basic favorite information
type FavoritesResponseDto struct {
	ID         string      `json:"id" example:"7235190573525635072" validate:"required"`
	UserID     string      `json:"userId" example:"528696135489945615" validate:"required"`
	HserviceID string      `json:"hserviceId" example:"7235190573525635072" validate:"required"`
	CreatedAt  time.Time   `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	HService   HServiceDto `json:"hservice" validate:"required"`
} //@name FavoritesFavoritesResponseDto
