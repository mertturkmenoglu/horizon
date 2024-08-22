package auth

import "time"

type LoginRequestDto struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type RegisterRequestDto struct {
	FullName string `json:"fullName" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type GetMeResponseDto struct {
	ID              string    `json:"id"`
	Email           string    `json:"email"`
	Username        string    `json:"username"`
	FullName        string    `json:"fullName"`
	GoogleID        *string   `json:"googleId"`
	IsEmailVerified bool      `json:"isEmailVerified"`
	IsActive        bool      `json:"isActive"`
	Role            string    `json:"role"`
	Gender          *string   `json:"gender"`
	ProfileImage    *string   `json:"profileImage"`
	LastLogin       time.Time `json:"lastLogin"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

type SendVerificationEmailRequestDto struct {
	Email string `json:"email" validate:"required,email"`
}

type SendForgotPasswordEmailRequestDto struct {
	Email string `json:"email" validate:"required,email"`
}
