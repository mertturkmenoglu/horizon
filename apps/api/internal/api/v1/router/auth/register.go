package auth

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db/query"
	"horizon/internal/hash"
	"horizon/internal/password"
)

func isAllowedRune(r rune) bool {
	if '0' <= r && r <= '9' {
		return true
	}

	if 'A' <= r && r <= 'Z' {
		return true
	}

	if r == '_' {
		return true
	}

	if 'a' <= r && r <= 'z' {
		return true
	}

	return false
}

func isValidUsername(str string) bool {
	for _, r := range str {
		if !isAllowedRune(r) {
			return false
		}
	}

	return true
}

func registerPreChecks(body dto.RegisterRequest) (string, error) {
	hashed, err := hash.Hash(body.Password)

	if !isValidUsername(body.Username) {
		return "", api.NewBadRequestError("Username must include only alphanumeric characters or underscore")
	}

	if err != nil {
		return "", api.NewBadRequestError(err.Error())
	}

	exists, err := query.DoesAuthExist(body.Email)

	if err != nil {
		return "", api.NewBadRequestError(err.Error())
	}

	if exists {
		return "", api.NewBadRequestError("Email has already been taken")
	}

	exists = query.UsernameExists(body.Username)

	if exists {
		return "", api.NewBadRequestError("Username has already been taken")
	}

	if !password.IsStrong(body.Password) {
		return "", api.NewBadRequestError("Password is too weak.")
	}

	return hashed, nil
}
