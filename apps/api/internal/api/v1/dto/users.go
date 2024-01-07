package dto

type GetUserByUsernameResponse struct {
	Id                 string                    `json:"id"`
	Name               string                    `json:"name"`
	Email              string                    `json:"email"`
	Username           string                    `json:"username"`
	Gender             string                    `json:"gender"`
	ContactInformation UserContactInformationDto `json:"contactInformation"`
	Location           UserLocationDto           `json:"location"`
	IsBusinessAccount  bool                      `json:"isBusinessAccount"`
	IsVerifiedAccount  bool                      `json:"isVerifiedAccount"`
	Description        string                    `json:"description"`
	AccountStatus      int                       `json:"accountStatus"`
	ProfileImage       string                    `json:"profileImage"`
}

type GetMeResponse struct {
	GetUserByUsernameResponse
	OnboardingCompleted bool `json:"onboardingCompleted"`
	EmailVerified       bool `json:"emailVerified"`
}

type UserContactInformationDto struct {
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
	Other   string `json:"other"`
}

type UserLocationDto struct {
	City    string `json:"city"`
	Admin   string `json:"admin"`
	Country string `json:"country"`
	Lat     string `json:"lat"`
	Long    string `json:"long"`
}

type UpdateMeRequest struct {
	Name        string `json:"name" validate:"omitempty,min=1,max=64"`
	Description string `json:"description" validate:"omitempty,min=1,max=256"`
	Gender      string `json:"gender" validate:"omitempty,min=1,max=64"`
}

type UpdateContactInformationRequest struct {
	Email   string `json:"email" validate:"omitempty,email"`
	Phone   string `json:"phone" validate:"omitempty,e164"`
	Address string `json:"address" validate:"omitempty,max=128"`
	Other   string `json:"other" validate:"omitempty,max=256"`
}

type UpdateLocationRequest struct {
	City    string `json:"city" validate:"required,max=64"`
	Admin   string `json:"admin" validate:"omitempty,min=1,max=64"`
	Country string `json:"country" validate:"required,max=64"`
	Lat     string `json:"lat" validate:"required,max=64"`
	Long    string `json:"long" validate:"required,max=64"`
}
