package users

import (
	"time"
)

// GetUserProfileByUsernameResponseDto
// @Description Basic user information
type GetUserProfileByUsernameResponseDto struct {
	ID           string    `json:"id" example:"528696135489945615" validate:"required"`
	Username     string    `json:"username" example:"johndoe" validate:"required"`
	FullName     string    `json:"fullName" example:"John Doe" validate:"required"`
	Gender       *string   `json:"gender" example:"male" validate:"optional"`
	ProfileImage *string   `json:"profileImage" example:"https://example.com/image.jpg" validate:"optional"`
	CreatedAt    time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" validate:"required"`
} //@name UsersGetUserProfileByUsernameResponseDto
