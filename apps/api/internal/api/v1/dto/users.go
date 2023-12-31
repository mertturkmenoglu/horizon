package dto

type GetUserByUsernameResponse struct {
	Id                 string                    `json:"id"`
	Name               string                    `json:"name"`
	Email              string                    `json:"email"`
	Username           string                    `json:"username"`
	Gender             string                    `json:"gender"`
	ContactInformation UserContactInformationDto `json:"contactInformation"`
	Location           UserLocationDto           `json:"location"`
}

type UserContactInformationDto struct {
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
	Other   string `json:"other"`
}

type UserLocationDto struct {
	City    string `json:"city"`
	Country string `json:"country"`
	Lat     string `json:"lat"`
	Long    string `json:"long"`
}

type UpdateMeRequest struct {
	Name   string `json:"name"`
	Gender string `json:"gender"`
}

type UpdateContactInformationRequest struct {
	Email   string `json:"email" validate:"omitempty,email"`
	Phone   string `json:"phone" validate:"omitempty,e164"`
	Address string `json:"address" validate:"omitempty"`
	Other   string `json:"other" validate:"omitempty"`
}

type UpdateLocationRequest struct {
	City    string `json:"city" validate:"required"`
	Country string `json:"country" validate:"required"`
	Lat     string `json:"lat" validate:"required"`
	Long    string `json:"long" validate:"required"`
}
