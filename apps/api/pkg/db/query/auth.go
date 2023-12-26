package query

import (
	"horizon/pkg/db"
	"horizon/pkg/db/models"
)

func DoesAuthExist(email string) (bool, error) {
	var auth models.Auth
	var user models.User

	res := db.Client.First(&user, "email = ?", email)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return false, nil
		}
		return false, res.Error
	}

	res = db.Client.First(&auth, "id = ?", user.AuthId)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return false, nil
		}
		return false, res.Error
	}

	return true, nil
}

func GetAuthByEmail(email string) (*models.Auth, error) {
	var auth models.Auth
	var user models.User

	res := db.Client.First(&user, "email = ?", email)

	if res.Error != nil {
		return nil, res.Error
	}

	res = db.Client.First(&auth, "id = ?", user.AuthId)

	if res.Error != nil {
		return nil, res.Error
	}

	return &auth, nil
}
