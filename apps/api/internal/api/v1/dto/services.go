package dto

import (
	categories "horizon/internal/category"
	"time"
)

type GetServiceCategoriesRespose = []categories.ServiceCategory

type GetServiceByIdResponse struct {
	Id               uint64                    `json:"id"`
	CreatedAt        time.Time                 `json:"createdAt"`
	UpdatedAt        time.Time                 `json:"updatedAt"`
	User             GetUserByUsernameResponse `json:"user"`
	Title            string                    `json:"title"`
	Slug             string                    `json:"slug"`
	Description      string                    `json:"description"`
	Category         int                       `json:"category"`
	Price            string                    `json:"price"`
	PriceUnit        string                    `json:"priceUnit"`
	PriceTimespan    int                       `json:"priceTimespan"`
	IsOnline         bool                      `json:"isOnline"`
	Location         string                    `json:"location"`
	DeliveryTime     int                       `json:"deliveryTime"`
	DeliveryTimespan int                       `json:"deliveryTimespan"`
	Photos           []ServicePhotoDto         `json:"photos"`
	Videos           []ServiceVideoDto         `json:"videos"`
}

type CreateServiceRequest struct {
	Title            string `json:"title"`
	Description      string `json:"description"`
	Category         int    `json:"category"`
	Price            string `json:"price"`
	PriceUnit        string `json:"priceUnit"`
	PriceTimespan    int    `json:"priceTimespan"`
	IsOnline         bool   `json:"isOnline"`
	Location         string `json:"location"`
	DeliveryTime     int    `json:"deliveryTime"`
	DeliveryTimespan int    `json:"deliveryTimespan"`
}

type UploadServicePhotosRequest struct {
	Photos []ServicePhotoDto `json:"photos"`
}

type UploadServiceVideosRequest struct {
	Videos []ServiceVideoDto `json:"videos"`
}

type ServicePhotoDto struct {
	ServiceId uint64 `json:"serviceId"`
	Url       string `json:"url"`
	Alt       string `json:"alt"`
}

type ServiceVideoDto struct {
	ServiceId uint64 `json:"serviceId"`
	Url       string `json:"url"`
	Alt       string `json:"alt"`
}
