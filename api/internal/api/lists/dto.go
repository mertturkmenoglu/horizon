package lists

import "time"

// GetMyListsResponseDtoItem
// @Description Basic list information
type GetMyListsResponseDtoItem struct {
	ID        string    `json:"id" example:"7235190573525635072" validate:"required"`
	Title     string    `json:"title" example:"Example List" validate:"required"`
	UserID    string    `json:"userId" example:"528696135489945615" validate:"required"`
	CreatedAt time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	UpdateAt  time.Time `json:"updateAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name ListsGetMyListsResponseDtoItem

// GetMyListsResponseDto
// @Description Basic list information
type GetMyListsResponseDto []GetMyListsResponseDtoItem //@name ListsGetMyListsResponseDto

// GetUsersListsResponseDtoItem
// @Description Basic list information
type GetUsersListsResponseDtoItem struct {
	ID        string    `json:"id" example:"7235190573525635072" validate:"required"`
	Title     string    `json:"title" example:"Example List" validate:"required"`
	UserID    string    `json:"userId" example:"528696135489945615" validate:"required"`
	User      UserDto   `json:"user" validate:"required"`
	CreatedAt time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	UpdateAt  time.Time `json:"updateAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name ListsGetUsersListsResponseDtoItem

// GetUsersListsResponseDto
// @Description Basic list information
type GetUsersListsResponseDto []GetUsersListsResponseDtoItem //@name ListsGetUsersListsResponseDto

// UserDto
// @Description Basic user information
type UserDto struct {
	ID           string    `json:"id" example:"528696135489945615" validate:"required"`
	Username     string    `json:"username" example:"johndoe" validate:"required"`
	FullName     string    `json:"fullName" example:"John Doe" validate:"required"`
	Gender       *string   `json:"gender" example:"male" validate:"optional"`
	ProfileImage *string   `json:"profileImage" example:"https://example.com/image.jpg" validate:"optional"`
	CreatedAt    time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name ListsUserDto

// GetItemListInfoResponseDtoItem
// @Description Basic list information
type GetItemListInfoResponseDtoItem struct {
	ID       string `json:"id" example:"7235190573525635072" validate:"required"`
	Title    string `json:"title" example:"Example List" validate:"required"`
	Includes bool   `json:"includes" example:"true" validate:"required"`
} //@name ListsGetItemListInfoResponseDtoItem

// GetItemListInfoResponseDto
// @Description Basic list information
type GetItemListInfoResponseDto []GetItemListInfoResponseDtoItem //@name ListsGetItemListInfoResponseDto

// GetListByIdResponseDto
// @Description Basic list information
type GetListByIdResponseDto struct {
	ID        string    `json:"id" example:"7235190573525635072" validate:"required"`
	Title     string    `json:"title" example:"Example List" validate:"required"`
	UserID    string    `json:"userId" example:"528696135489945615" validate:"required"`
	User      UserDto   `json:"user" validate:"required"`
	Items     []ItemDto `json:"items" validate:"required"`
	CreatedAt time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	UpdatedAt time.Time `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name ListsGetListByIdResponseDto

// ItemDto
// @Description Basic list item information
type ItemDto struct {
	ID         string      `json:"id" example:"7235190573525635072" validate:"required"`
	ListId     string      `json:"listId" example:"7235190573525635072" validate:"required"`
	HServiceId string      `json:"hserviceId" example:"7235190573525635072" validate:"required"`
	HService   HServiceDto `json:"hservice" validate:"required"`
	ItemOrder  int         `json:"itemOrder" example:"1" validate:"required"`
} //@name ListsItemDto

// HServiceDto
// @Description Basic service information with user information
type HServiceDto struct {
	ID               string         `json:"id" example:"7235190573525635072" validate:"required"`
	UserID           string         `json:"userId" example:"528696135489945615" validate:"required"`
	User             UserDto        `json:"user" validate:"required"`
	Title            string         `json:"title" example:"Example Service" validate:"required"`
	Slug             string         `json:"slug" example:"example-service" validate:"required"`
	Description      string         `json:"description" example:"Example service description" validate:"required"`
	Category         int32          `json:"category" example:"1" validate:"required"`
	Price            float64        `json:"price" example:"10" validate:"required"`
	PriceUnit        string         `json:"priceUnit" example:"USD" validate:"required"`
	PriceTimespan    string         `json:"priceTimespan" example:"HOURLY" validate:"required"`
	IsOnline         bool           `json:"isOnline" example:"true" validate:"required"`
	Url              *string        `json:"url" example:"https://example.com" validate:"optional"`
	Location         string         `json:"location" example:"Example Location" validate:"required"`
	DeliveryTime     int32          `json:"deliveryTime" example:"1" validate:"required"`
	DeliveryTimespan string         `json:"deliveryTimespan" example:"HOURLY" validate:"required"`
	TotalPoints      int64          `json:"totalPoints" example:"50" validate:"required"`
	TotalVotes       int32          `json:"totalVotes" example:"10" validate:"required"`
	Media            map[string]any `json:"media" validate:"required"`
	CreatedAt        time.Time      `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	UpdatedAt        time.Time      `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name ListsHServiceDto

// CreateListRequestDto
// @Description CreateListRequestDto
type CreateListRequestDto struct {
	Title string `json:"title" validate:"required,min=5,max=128"`
} //@name ListsCreateListRequestDto

// CreateListResponseDto
type CreateListResponseDto struct {
	ID        string    `json:"id" example:"7235190573525635072" validate:"required"`
	Title     string    `json:"title" example:"Example List" validate:"required"`
	UserID    string    `json:"userId" example:"528696135489945615" validate:"required"`
	CreatedAt time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
	UpdatedAt time.Time `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name ListsCreateListResponseDto

// CreateListItemRequestDto
// @Description CreateListItemRequestDto
type CreateListItemRequestDto struct {
	ListId     string `json:"listId" validate:"required,min=1,max=64"`
	HserviceId string `json:"hserviceId" validate:"required,min=1,max=64"`
	ItemOrder  int    `json:"itemOrder" validate:"required"`
} //@name ListsCreateListItemRequestDto

// CreateListItemResponseDto
// @Description CreateListItemResponseDto
type CreateListItemResponseDto struct {
	ID         string `json:"id" example:"7235190573525635072" validate:"required"`
	ListId     string `json:"listId" example:"7235190573525635072" validate:"required"`
	HserviceId string `json:"hserviceId" example:"7235190573525635072" validate:"required"`
	ItemOrder  int    `json:"itemOrder" example:"1" validate:"required"`
} //@name ListsCreateListItemResponseDto

// UpdateListRequestDto
// @Description UpdateListRequestDto
type UpdateListRequestDto struct {
	Title string `json:"title" validate:"required,min=5,max=128"`
} //@name ListsUpdateListRequestDto
