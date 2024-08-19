package search

import (
	"context"
	"log"
	"strings"
	"time"
)

func (s *Search) CreateSchemas() {
	for _, schema := range schemas {
		_, err := s.Client.Collections().Create(context.Background(), schema)

		if err != nil {
			// We don't care if the schema already exists
			existsErr := strings.ContainsAny(err.Error(), "already exists")

			if !existsErr {
				log.Fatal(err.Error())
			}
		}
	}
}

func (s *Search) UpsertHService(v UpsertHServiceDto) (map[string]interface{}, error) {
	return s.Client.Collection("HService").Documents().Upsert(context.Background(), v)
}

type UserDto struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	FullName     string    `json:"fullName"`
	Gender       *string   `json:"gender"`
	ProfileImage *string   `json:"profileImage"`
	CreatedAt    time.Time `json:"createdAt"`
}

type UpsertHServiceDto struct {
	ID               string         `json:"id"`
	UserID           string         `json:"userId"`
	User             UserDto        `json:"user"`
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
