package models

type Auth struct {
	BaseModel
	FirstName string `json:"firstName"`
	LastName string `json:"lastName"`
	Email string `json:"email"`
	OnboardingCompleted bool `json:"onboardingCompleted"`
	EmailVerified bool `json:"emailVerified"`
	Password string `json:"-"`
}