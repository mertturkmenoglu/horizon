package auth

import "time"

type LoginRequestDto struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type RegisterRequestDto struct {
	FullName string `json:"fullName" validate:"required,min=3,max=128"`
	Email    string `json:"email" validate:"required,email,max=128"`
	Username string `json:"username" validate:"required,min=4,max=32"`
	Password string `json:"password" validate:"required,min=6,max=128"`
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

type ResetPasswordRequestDto struct {
	Email       string `json:"email" validate:"required,email"`
	Code        string `json:"code" validate:"required"`
	NewPassword string `json:"newPassword" validate:"required"`
}

type googleUser struct {
	Id            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
}
