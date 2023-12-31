package jsonwebtoken

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
)

func Encode(payload Payload, expiresAt time.Time) (string, error) {
	secretKey := viper.GetString("jwt.secret")

	claims := Claims{
		payload.Name,
		payload.Email,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiresAt),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    viper.GetString("jwt.issuer"),
			Subject:   payload.Email,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString([]byte(secretKey))

	if err != nil {
		return "", err
	}

	return signed, nil
}

func Decode(tokenString string) (*Claims, error) {
	secretKey := viper.GetString("jwt.secret")

	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)

	if !ok || !token.Valid {
		return nil, ErrorInvalidToken
	}

	if claims.ExpiresAt.Before(time.Now()) || claims.NotBefore.After(time.Now()) {
		return nil, ErrorExpired
	}

	return claims, nil
}
