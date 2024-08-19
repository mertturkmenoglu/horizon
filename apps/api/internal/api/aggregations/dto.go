package aggregations

import (
	"time"
)

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

type GetHomeAggregationsResponseDto struct {
	New       []HServiceResponseDto `json:"new"`
	Popular   []HServiceResponseDto `json:"popular"`
	Featured  []HServiceResponseDto `json:"featured"`
	Favorites []HServiceResponseDto `json:"favorites"`
}
