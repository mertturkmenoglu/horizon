package aggregations

import "github.com/jackc/pgx/v5/pgtype"

type HServiceResponseDto struct {
	ID               string             `json:"id"`
	UserID           string             `json:"userId"`
	Title            string             `json:"title"`
	Slug             string             `json:"slug"`
	Description      string             `json:"description"`
	Category         int32              `json:"category"`
	Price            float64            `json:"price"`
	PriceUnit        string             `json:"priceUnit"`
	PriceTimespan    string             `json:"priceTimespan"`
	IsOnline         bool               `json:"isOnline"`
	Url              pgtype.Text        `json:"url"`
	Location         string             `json:"location"`
	DeliveryTime     int32              `json:"deliveryTime"`
	DeliveryTimespan string             `json:"deliveryTimespan"`
	TotalPoints      int64              `json:"totalPoints"`
	TotalVotes       int32              `json:"totalVotes"`
	Media            map[string]any     `json:"media"`
	CreatedAt        pgtype.Timestamptz `json:"createdAt"`
	UpdatedAt        pgtype.Timestamptz `json:"updatedAt"`
}

type GetHomeAggregationsResponseDto struct {
	New       []HServiceResponseDto `json:"new"`
	Popular   []HServiceResponseDto `json:"popular"`
	Featured  []HServiceResponseDto `json:"featured"`
	Favorites []HServiceResponseDto `json:"favorites"`
}
