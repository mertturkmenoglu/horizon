package auth

import "time"

// LoginRequestDto godoc
//
// @Description Login request dto
type LoginRequestDto struct {
	Email    string `json:"email" validate:"required,email" example:"johndoe@example.com"`
	Password string `json:"password" validate:"required" example:"password123" minLength:"6" maxLength:"128" format:"password"`
}

type RegisterRequestDto struct {
	FullName string `json:"fullName" validate:"required,min=3,max=128" example:"John Doe" minLength:"3" maxLength:"128"`
	Email    string `json:"email" validate:"required,email,max=128" example:"johndoe@example.com" minLength:"3" maxLength:"128"`
	Username string `json:"username" validate:"required,min=4,max=32" example:"johndoe" minLength:"4" maxLength:"32"`
	Password string `json:"password" validate:"required,min=6,max=128" example:"password123" minLength:"6" maxLength:"128" format:"password"`
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
	CreatedAt       time.Time `json:"createdAt" example:"2024-08-26T10:24:13.508676+03:00" format:"date-time"`
	UpdatedAt       time.Time `json:"updatedAt" example:"2024-08-26T10:24:13.508676+03:00" format:"date-time"`
}

type SendVerificationEmailRequestDto struct {
	Email string `json:"email" validate:"required,email" example:"johndoe@example.com"`
}

type SendForgotPasswordEmailRequestDto struct {
	Email string `json:"email" validate:"required,email" example:"johndoe@example.com"`
}

type ResetPasswordRequestDto struct {
	Email       string `json:"email" validate:"required,email" example:"johndoe@example.com"`
	Code        string `json:"code" validate:"required" example:"123456"`
	NewPassword string `json:"newPassword" validate:"required,min=6,max=128" example:"password123" minLength:"6" maxLength:"128" format:"password"`
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
