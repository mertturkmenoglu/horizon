package auth

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/models"
	"horizon/internal/pagination"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func createUser(hashed string, dto dto.RegisterRequest) error {
	err := db.Client.Transaction(func(tx *gorm.DB) error {
		auth := models.Auth{
			Password: hashed,
		}

		res := tx.Create(&auth)

		if res.Error != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
		}

		user := models.User{
			AuthId:              auth.Id,
			Name:                dto.Name,
			Email:               dto.Email,
			Username:            dto.Username,
			OnboardingCompleted: false,
			EmailVerified:       false,
		}

		res = tx.Omit(clause.Associations).Create(&user)

		if res.Error != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
		}

		// return nil will commit the whole transaction
		return nil
	})

	return err
}

func completeOnboarding(id string) error {
	res := db.Client.
		Model(&models.User{}).
		Where("id = ?", id).
		Update("onboarding_completed", true)

	return res.Error
}

func verifyEmail(email string) error {
	res := db.Client.
		Model(&models.User{}).
		Where("email = ?", email).
		Update("email_verified", true)

	return res.Error
}

func updatePassword(id string, hashed string) error {
	res := db.Client.
		Model(&models.Auth{}).
		Where("id = ?", id).
		Update("password", hashed)

	return res.Error
}

func getAuthActivities(id string, params pagination.Params) ([]*models.AuthActivity, int64, error) {
	var activities []*models.AuthActivity
	var count int64

	res := db.Client.
		Where("auth_id = ?", id).
		Order("created_at DESC").
		Limit(params.PageSize).
		Offset(params.Offset).
		Find(&activities)

	if res.Error != nil {
		return nil, 0, api.NewBadRequestError()
	}

	res = db.Client.
		Table("auth_activities").
		Where("auth_id = ?", id).
		Count(&count)

	if res.Error != nil {
		return nil, 0, api.NewBadRequestError()
	}

	return activities, count, nil
}
