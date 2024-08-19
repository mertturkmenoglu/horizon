package favorites

import "time"

type CreateFavoriteRequestDto struct {
	HServiceId string `json:"hserviceId" validate:"required,min=1,max=64"`
}

type CreateFavoriteResponseDto struct {
	ID string `json:"id"`
}

type HServiceDto struct {
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
	CreatedAt        *time.Time     `json:"createdAt"`
	UpdatedAt        *time.Time     `json:"updatedAt"`
}

type FavoritesResponseDto struct {
	ID         string      `json:"id"`
	UserID     string      `json:"userId"`
	HserviceID string      `json:"hserviceId"`
	CreatedAt  time.Time   `json:"createdAt"`
	HService   HServiceDto `json:"hservice"`
}
