package jsonwebtoken

import (
	"errors"

	"github.com/golang-jwt/jwt/v5"
)

var (
	ErrorExpired      = errors.New("token is expired")
	ErrorInvalidToken = errors.New("invalid token")
)

type Payload struct {
	AuthId   string
	UserId   string
	Name     string
	Email    string
	Username string
}

type Claims struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	jwt.RegisteredClaims
}
