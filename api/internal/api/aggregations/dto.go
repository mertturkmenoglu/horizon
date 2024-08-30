package aggregations

import (
	"time"
)

// UserResponseDto
// @Description Basic user information
type UserResponseDto struct {
	ID           string    `json:"id" example:"528696135489945615" validate:"required"`
	Username     string    `json:"username" example:"johndoe" validate:"required"`
	FullName     string    `json:"fullName" example:"John Doe" validate:"required"`
	Gender       *string   `json:"gender" example:"male" validate:"optional"`
	ProfileImage *string   `json:"profileImage" example:"https://example.com/image.jpg" validate:"optional"`
	CreatedAt    time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name AggregationsUserResponseDto

// HServiceResponseDto
// @Description Basic service information
// @Description with user information
type HServiceResponseDto struct {
	ID               string          `json:"id" example:"7234882566245847040" validate:"required"`
	UserID           string          `json:"userId" example:"528696135489945615" validate:"required"`
	User             UserResponseDto `json:"user" validate:"required"`
	Title            string          `json:"title" example:"Example Service" validate:"required"`
	Slug             string          `json:"slug" example:"example-service" validate:"required"`
	Description      string          `json:"description" example:"Example service description" validate:"required"`
	Category         int32           `json:"category" example:"1" validate:"required"`
	Price            float64         `json:"price" example:"10.00" validate:"required"`
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
} //@name AggregationsHServiceResponseDto

// GetHomeAggregationsResponseDto
// @Description Response for home aggregations
type GetHomeAggregationsResponseDto struct {
	New       []HServiceResponseDto `json:"new" validate:"required"`
	Popular   []HServiceResponseDto `json:"popular" validate:"required"`
	Featured  []HServiceResponseDto `json:"featured" validate:"required"`
	Favorites []HServiceResponseDto `json:"favorites" validate:"required"`
} //@name GetHomeAggregationsResponseDto
