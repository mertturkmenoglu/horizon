package lists

import "time"

type GetMyListsResponseDtoItem struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	UserID    string    `json:"userId"`
	CreatedAt time.Time `json:"createdAt"`
	UpdateAt  time.Time `json:"updateAt"`
}

type GetMyListsResponseDto []GetMyListsResponseDtoItem

type GetUsersListsResponseDtoItem struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	UserID    string    `json:"userId"`
	User      UserDto   `json:"user"`
	CreatedAt time.Time `json:"createdAt"`
	UpdateAt  time.Time `json:"updateAt"`
}

type GetUsersListsResponseDto []GetUsersListsResponseDtoItem

type UserDto struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	FullName     string    `json:"fullName"`
	Gender       *string   `json:"gender"`
	ProfileImage *string   `json:"profileImage"`
	CreatedAt    time.Time `json:"createdAt"`
}

type GetItemListInfoResponseDtoItem struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Includes bool   `json:"includes"`
}

type GetItemListInfoResponseDto []GetItemListInfoResponseDtoItem

type GetListByIdResponseDto struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	UserID    string    `json:"userId"`
	User      UserDto   `json:"user"`
	Items     []ItemDto `json:"items"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type ItemDto struct {
	ID         string      `json:"id"`
	ListId     string      `json:"listId"`
	HServiceId string      `json:"hserviceId"`
	HService   HServiceDto `json:"hservice"`
	ItemOrder  int         `json:"itemOrder"`
}

type HServiceDto struct {
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

type CreateListRequestDto struct {
	Title string `json:"title" validate:"required,min=5,max=128"`
}

type CreateListResponseDto struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	UserID    string    `json:"userId"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type CreateListItemRequestDto struct {
	ListId     string `json:"listId" validate:"required,min=1,max=64"`
	HserviceId string `json:"hserviceId" validate:"required,min=1,max=64"`
	ItemOrder  int    `json:"itemOrder" validate:"required"`
}

type CreateListItemResponseDto struct {
	ID         string `json:"id"`
	ListId     string `json:"listId"`
	HserviceId string `json:"hserviceId"`
	ItemOrder  int    `json:"itemOrder"`
}
