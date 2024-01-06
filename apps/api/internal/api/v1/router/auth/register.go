package auth

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db/query"
	"horizon/internal/hash"
	"horizon/internal/password"
)

func registerPreChecks(body dto.RegisterRequest) (string, error) {
	hashed, err := hash.Hash(body.Password)

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
