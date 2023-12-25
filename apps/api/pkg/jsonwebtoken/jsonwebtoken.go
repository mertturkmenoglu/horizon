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
	FullName string
	Email    string
}

type Claims struct {
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	jwt.RegisteredClaims
}
