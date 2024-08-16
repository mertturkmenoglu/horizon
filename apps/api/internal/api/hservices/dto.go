package hservices

type CreateHServiceRequestDto struct {
	Title            string  `json:"title" validate:"required,min=5,max=64"`
	Description      string  `json:"description" validate:"required,min=5,max=4096"`
	Category         int     `json:"category" validate:"required,min=1,max=32"`
	Price            float64 `json:"price" validate:"required,min=1,max=10000"`
	PriceUnit        string  `json:"priceUnit" validate:"required"`
	PriceTimespan    string  `json:"priceTimespan" validate:"required"`
	IsOnline         *bool   `json:"isOnline" validate:"required"`
	Url              *string `json:"url"`
	Location         string  `json:"location" validate:"required,min=1,max=256"`
	DeliveryTime     int     `json:"deliveryTime" validate:"required,min=1,max=32"`
	DeliveryTimespan string  `json:"deliveryTimespan" validate:"required"`
	Media            string  `json:"media"`
}
