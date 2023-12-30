package models

type Auth struct {
	BaseModel
	Password string `json:"-"`
}
