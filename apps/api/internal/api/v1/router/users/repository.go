package users

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/db/models"

	"github.com/google/uuid"
	"gorm.io/gorm/clause"
)

func getUser(username string) (*models.User, error) {
	r, err := cacheGetUser(username)

	if err == nil {
		return r, nil
	}

	var user *models.User

	res := db.Client.
		Preload(clause.Associations).
		First(&user, "username = ?", username)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return nil, api.NewNotFoundError("Cannot found user with the username: ", username)
		}

		return nil, api.NewInternalServerError(res.Error.Error())
	}

	cacheSetUser(*user)
	return user, nil
}

func updateProfile(username string, dto dto.UpdateMeRequest) error {
	res := db.Client.Model(&models.User{}).
		Where("username = ?", username).
		Updates(map[string]interface{}{
			"name":        dto.Name,
			"description": dto.Description,
			"gender":      dto.Gender,
		})

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return api.NewNotFoundError("Cannot found a user with username: ", username)
		}

		return api.NewInternalServerError("Cannot update record")
	}

	return nil
}

func updateProfileImage(userId string, url string) error {
	res := db.Client.Model(&models.User{}).
		Where("id = ?", userId).
		Update("profile_image", url)

	return res.Error
}

func createLocation(userId string, dto dto.UpdateLocationRequest) error {
	id := uuid.MustParse(userId)

	return db.Client.Create(&models.Location{
		UserID:  id,
		City:    dto.City,
		Admin:   dto.Admin,
		Country: dto.Country,
		Lat:     dto.Lat,
		Long:    dto.Long,
	}).Error
}

func updateLocation(userId string, dto dto.UpdateLocationRequest) error {
	return db.Client.Model(&models.Location{}).
		Where("user_id = ?", userId).
		Updates(map[string]interface{}{
			"city":    dto.City,
			"admin":   dto.Admin,
			"country": dto.Country,
			"lat":     dto.Lat,
			"long":    dto.Long,
		}).Error
}

func createContact(userId string, dto dto.UpdateContactInformationRequest) error {
	id := uuid.MustParse(userId)
	return db.Client.Create(&models.ContactInformation{
		UserId:  id,
		Email:   dto.Email,
		Phone:   dto.Phone,
		Address: dto.Address,
		Other:   dto.Other,
	}).Error
}

func updateContact(userId string, dto dto.UpdateContactInformationRequest) error {
	return db.Client.Model(&models.ContactInformation{}).
		Where("user_id = ?", userId).
		Updates(map[string]interface{}{
			"email":   dto.Email,
			"phone":   dto.Phone,
			"address": dto.Address,
			"other":   dto.Other,
		}).Error
}
