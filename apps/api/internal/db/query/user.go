package query

import (
	"horizon/internal/db"
	"horizon/internal/db/models"
)

func GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	res := db.Client.First(&user, "email = ?", email)

	if res.Error != nil {
		return nil, res.Error
	}

	return &user, nil
}

func UsernameExists(username string) bool {
	var user models.User

	res := db.Client.First(&user, "username = ?", username)

	if res.Error != nil {
		return false
	}

	return true
}
