package auth

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db/query"
	"horizon/internal/hash"
	"horizon/internal/jsonwebtoken"
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

	if err != nil {
		return "", api.NewBadRequestError(err.Error())
	}

	if !isValidUsername(body.Username) {
		return "", api.NewBadRequestError(ErrUsernameChars)
	}

	exists, err := query.DoesAuthExist(body.Email)

	if err != nil {
		return "", api.NewBadRequestError(err.Error())
	}

	if exists {
		return "", api.NewBadRequestError(ErrEmailTaken)
	}

	exists = query.UsernameExists(body.Username)

	if exists {
		return "", api.NewBadRequestError(ErrUsernameTaken)
	}

	if !password.IsStrong(body.Password) {
		return "", api.NewBadRequestError(ErrPasswordTooWeak)
	}

	return hashed, nil
}

func changePasswordPreChecks(auth jsonwebtoken.Payload, body dto.ChangePasswordRequest) error {
	dbAuth, err := query.GetAuthByEmail(auth.Email)

	if err != nil {
		return api.NewInternalServerError()
	}

	var hashed = ""

	if dbAuth != nil {
		hashed = dbAuth.Password
	}

	matched, err := hash.Verify(body.CurrentPassword, hashed)

	if err != nil {
		return api.NewBadRequestError(err.Error())
	}

	if !matched {
		return api.NewUnauthorizedError(ErrPasswordDontMatch)
	}

	if !password.IsStrong(body.NewPassword) {
		return api.NewBadRequestError(ErrPasswordTooWeak)
	}

	return nil
}
