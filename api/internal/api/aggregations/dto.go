package aggregations

import (
	"time"
)

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
// @Description Basic service information
// @Description with user information
type HServiceResponseDto struct {
	ID               string          `json:"id" example:"7234882566245847040"`
	UserID           string          `json:"userId" example:"528696135489945615"`
	User             UserResponseDto `json:"user"`
	Title            string          `json:"title" example:"Example Service"`
	Slug             string          `json:"slug" example:"example-service"`
	Description      string          `json:"description" example:"Example service description"`
	Category         int32           `json:"category" example:"1"`
	Price            float64         `json:"price" example:"10.00"`
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

// GetHomeAggregationsResponseDto
// @Description Response for home aggregations
type GetHomeAggregationsResponseDto struct {
	New       []HServiceResponseDto `json:"new"`
	Popular   []HServiceResponseDto `json:"popular"`
	Featured  []HServiceResponseDto `json:"featured"`
	Favorites []HServiceResponseDto `json:"favorites"`
}
