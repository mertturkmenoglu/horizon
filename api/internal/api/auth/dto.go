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
	ID              string    `json:"id" example:"528696135489945615"`
	Email           string    `json:"email" example:"johndoe@example.com"`
	Username        string    `json:"username" example:"johndoe"`
	FullName        string    `json:"fullName" example:"John Doe"`
	GoogleID        *string   `json:"googleId" example:"10887502189381205719451"`
	IsEmailVerified bool      `json:"isEmailVerified" example:"true"`
	IsActive        bool      `json:"isActive" example:"true"`
	Role            string    `json:"role" example:"user"`
	Gender          *string   `json:"gender" example:"male"`
	ProfileImage    *string   `json:"profileImage" example:"https://example.com/image.jpg"`
	LastLogin       time.Time `json:"lastLogin" example:"2024-08-26T10:24:13.508676+03:00"`
	CreatedAt       time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00"`
	UpdatedAt       time.Time `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00"`
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
