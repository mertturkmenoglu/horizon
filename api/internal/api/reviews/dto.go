package reviews

import "time"

type GetReviewsByHServiceIdResponseDto []ReviewItemDto

type GetReviewsByUsernameResponseDto GetReviewsByHServiceIdResponseDto

type GetReviewByIdResponseDto ReviewItemDto

type Media map[string]any

type ReviewItemDto struct {
	ID           string      `json:"id"`
	UserID       string      `json:"userId"`
	User         UserDto     `json:"user"`
	HServiceID   string      `json:"hserviceId"`
	HService     HServiceDto `json:"hservice"`
	Rating       int16       `json:"rating"`
	Comment      string      `json:"comment"`
	Media        Media       `json:"media"`
	LikeCount    int32       `json:"likeCount"`
	DislikeCount int32       `json:"dislikeCount"`
	CreatedAt    time.Time   `json:"createdAt"`
	UpdatedAt    time.Time   `json:"updatedAt"`
}

type UserDto struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	FullName     string    `json:"fullName"`
	Gender       *string   `json:"gender"`
	ProfileImage *string   `json:"profileImage"`
	CreatedAt    time.Time `json:"createdAt"`
}

type HServiceDto struct {
	ID               string    `json:"id"`
	UserID           string    `json:"userId"`
	Title            string    `json:"title"`
	Slug             string    `json:"slug"`
	Description      string    `json:"description"`
	Category         int32     `json:"category"`
	Price            float64   `json:"price"`
	PriceUnit        string    `json:"priceUnit"`
	PriceTimespan    string    `json:"priceTimespan"`
	IsOnline         bool      `json:"isOnline"`
	Url              *string   `json:"url"`
	Location         string    `json:"location"`
	DeliveryTime     int32     `json:"deliveryTime"`
	DeliveryTimespan string    `json:"deliveryTimespan"`
	TotalPoints      int64     `json:"totalPoints"`
	TotalVotes       int32     `json:"totalVotes"`
	Media            Media     `json:"media"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

type CreateReviewRequestDto struct {
	HServiceID string `json:"hserviceId" validate:"required,min=1,max=64"`
	Rating     int16  `json:"rating" validate:"required,min=1,max=5"`
	Comment    string `json:"comment" validate:"required,min=1,max=512"`
	Media      string `json:"media"`
}

type CreateReviewVoteRequestDto struct {
	VoteType string `json:"voteType" validate:"required"`
}

type CreateReviewResponseDto struct {
	ID           string    `json:"id"`
	UserID       string    `json:"userId"`
	HServiceID   string    `json:"hserviceId"`
	Rating       int16     `json:"rating"`
	Comment      string    `json:"comment"`
	Media        Media     `json:"media"`
	LikeCount    int32     `json:"likeCount"`
	DislikeCount int32     `json:"dislikeCount"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}
