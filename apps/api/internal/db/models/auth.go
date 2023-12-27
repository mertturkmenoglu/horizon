package models

type Auth struct {
	BaseModel
	EmailVerified bool   `json:"emailVerified"`
	Password      string `json:"-"`
}
