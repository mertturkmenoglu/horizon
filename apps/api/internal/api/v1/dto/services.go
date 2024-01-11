package dto

import (
	categories "horizon/internal/category"
	"time"
)

type GetServiceCategoriesRespose = []categories.ServiceCategory

type GetServiceByIdResponse struct {
	Id               string            `json:"id"`
	CreatedAt        time.Time         `json:"createdAt"`
	UpdatedAt        time.Time         `json:"updatedAt"`
	User             ServiceUserDto    `json:"user"`
	Title            string            `json:"title"`
	Slug             string            `json:"slug"`
	Description      string            `json:"description"`
	Category         int               `json:"category"`
	Price            string            `json:"price"`
	PriceUnit        string            `json:"priceUnit"`
	PriceTimespan    int               `json:"priceTimespan"`
	IsOnline         bool              `json:"isOnline"`
	Location         string            `json:"location"`
	DeliveryTime     int               `json:"deliveryTime"`
	DeliveryTimespan int               `json:"deliveryTimespan"`
	Status           int               `json:"status"`
	Visits           uint64            `json:"visits"`
	IsNew            bool              `json:"isNew"`
	IsPopular        bool              `json:"isPopular"`
	Photos           []ServicePhotoDto `json:"photos"`
	Videos           []ServiceVideoDto `json:"videos"`
}

type ServiceUserDto struct {
	Id                string `json:"id"`
	Name              string `json:"name"`
	Username          string `json:"username"`
	IsBusinessAccount bool   `json:"isBusinessAccount"`
	IsVerifiedAccount bool   `json:"isVerifiedAccount"`
	AccountStatus     int    `json:"accountStatus"`
	ProfileImage      string `json:"profileImage"`
}

type CreateServiceRequest struct {
	Title            string `json:"title" validation:"required,min=1,max=64"`
	Description      string `json:"description" validation:"required,min=1,max=4096"`
	Category         int    `json:"category" validation:"required,min=1,max=45"`
	Price            string `json:"price" validation:"required,min=1,max=10"`
	PriceUnit        string `json:"priceUnit" validation:"required,iso4217"`
	PriceTimespan    int    `json:"priceTimespan" validation:"required,min=0,max=3"`
	IsOnline         bool   `json:"isOnline" validation:"required"`
	Location         string `json:"location" validation:"required,min=1,max=128"`
	DeliveryTime     int    `json:"deliveryTime" validation:"required,min=0,max=50"`
	DeliveryTimespan int    `json:"deliveryTimespan" validation:"required,min=0,max=3"`
}

type UploadServicePhotosRequest struct {
	Photos []ServicePhotoDto `json:"photos"`
}

type UploadServiceVideosRequest struct {
	Videos []ServiceVideoDto `json:"videos"`
}

type ServicePhotoDto struct {
	ServiceId string `json:"serviceId"`
	Url       string `json:"url"`
	Alt       string `json:"alt"`
}

type ServiceVideoDto struct {
	ServiceId string `json:"serviceId"`
	Url       string `json:"url"`
	Alt       string `json:"alt"`
}
