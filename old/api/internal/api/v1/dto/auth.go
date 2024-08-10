package dto

import (
	"horizon/internal/models"
)

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type RegisterRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=64"`
	Name     string `json:"name" validate:"required"`
	Username string `json:"username" validate:"required"`
}

type BulkRegisterRequest struct {
	Data []RegisterRequest `json:"data"`
}

type PasswordStrengthRequest struct {
	Password string `json:"password" validate:"required"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"currentPassword" validate:"required"`
	NewPassword     string `json:"newPassword" validate:"required"`
}

type PasswordResetEmailRequest struct {
	Email string `json:"email" validate:"required,email"`
}

type VerifyEmailEmailRequest struct {
	Email string `json:"email" validate:"required,email"`
}

type PasswordResetRequest struct {
	Email       string `json:"email" validate:"required,email"`
	Code        string `json:"code" validate:"required"`
	NewPassword string `json:"newPassword" validate:"required"`
}

type VerifyEmailRequest struct {
	Code  string `json:"code" validate:"required"`
	Email string `json:"email" validate:"required,email"`
}

type GetAuthActivitiesResponse []*models.AuthActivity
