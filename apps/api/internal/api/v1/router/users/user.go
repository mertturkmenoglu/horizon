package users

import (
	"context"
	"fmt"
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/cache"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"horizon/internal/upload"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/minio/minio-go/v7"
	"github.com/spf13/viper"
	"gorm.io/gorm/clause"
)

func getUser(username string) (*models.User, error) {
	key := fmt.Sprintf("user:%s", username)
	cacheRes, err := cache.GetObj[models.User](key)

	if err == nil {
		return cacheRes, nil
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

	_ = cache.SetObj[models.User](key, *user, time.Minute*2)
	return user, nil
}

func GetMe(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	user, err := getUser(auth.Username)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, h.Response[dto.GetMeResponse]{
		"data": dto.GetMeResponse{
			GetUserByUsernameResponse: mapModelToGetUserByUsernameResponse(user),
			OnboardingCompleted:       user.OnboardingCompleted,
			EmailVerified:             user.EmailVerified,
		},
	})
}

func GetUserByUsername(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "username is required")
	}

	user, err := getUser(username)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, h.Response[dto.GetUserByUsernameResponse]{
		"data": mapModelToGetUserByUsernameResponse(user),
	})
}

func UpdateMe(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.UpdateMeRequest)

	res := db.Client.Model(&models.User{}).
		Where("username = ?", auth.Username).
		Updates(map[string]interface{}{
			"name":        body.Name,
			"description": body.Description,
			"gender":      body.Gender,
		})

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return api.NewNotFoundError("Cannot found a user with username: ", auth.Username)
		}

		return api.NewInternalServerError("Cannot update record")
	}

	_ = cache.Del("user:" + auth.Username)

	return c.NoContent(http.StatusOK)
}

func UpdateProfileImage(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)

	file, err := c.FormFile("file")
	if err != nil {
		return err
	}

	src, err := file.Open()
	if err != nil {
		return err
	}

	defer src.Close()

	var maxFileSize int64 = 5e6
	contentType := file.Header.Get("Content-Type")
	contentTypeOk := contentType == "image/jpg" || contentType == "image/jpeg" || contentType == "image/png"
	sizeOk := file.Size <= maxFileSize

	if !contentTypeOk {
		return api.NewBadRequestError("Unsupported MIME type")
	}

	if !sizeOk {
		return api.NewContentTooLargeError("Max size is 5 MBs")
	}

	ext := getExtensionFromContentType(contentType)
	objectName := fmt.Sprintf("%s%s", auth.Username, ext)

	ctx := context.Background()
	bucket := viper.GetString("minio.buckets.profile-images")

	info, err := upload.Client().
		PutObject(ctx, bucket, objectName, src, -1, minio.PutObjectOptions{
			ContentType: contentType,
		})

	db.Client.Model(&models.User{}).
		Where("id = ?", auth.UserId).
		Update("profile_image", info.Location)

	_ = cache.Del(fmt.Sprintf("user:%s", auth.Username))

	return c.JSON(http.StatusOK, h.Response[any]{
		"data": info.Location,
	})
}

func UpdateMyLocation(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.UpdateLocationRequest)

	var loc *models.Location

	res := db.Client.First(loc, "user_id = ?", auth.UserId)

	if res.Error != nil {
		id := uuid.MustParse(auth.UserId)

		db.Client.Create(&models.Location{
			UserID:  id,
			City:    body.City,
			Admin:   body.Admin,
			Country: body.Country,
			Lat:     body.Lat,
			Long:    body.Long,
		})
	} else {
		db.Client.Model(&models.Location{}).
			Where("user_id = ?", auth.UserId).
			Updates(map[string]interface{}{
				"city":    body.City,
				"admin":   body.Admin,
				"country": body.Country,
				"lat":     body.Lat,
				"long":    body.Long,
			})
	}

	return c.NoContent(http.StatusOK)
}

func UpdateMyContactInformation(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.UpdateContactInformationRequest)

	var contact *models.ContactInformation

	res := db.Client.First(&contact, "user_id = ?", auth.UserId)

	if res.Error != nil {
		id := uuid.MustParse(auth.UserId)
		db.Client.Create(&models.ContactInformation{
			UserId:  id,
			Email:   body.Email,
			Phone:   body.Phone,
			Address: body.Address,
			Other:   body.Other,
		})
	} else {
		db.Client.Model(&models.ContactInformation{}).
			Where("user_id = ?", auth.UserId).
			Updates(map[string]interface{}{
				"email":   body.Email,
				"phone":   body.Phone,
				"address": body.Address,
				"other":   body.Other,
			})
	}

	_ = cache.Del("user:" + auth.Username)

	return c.NoContent(http.StatusOK)
}

func getExtensionFromContentType(contentType string) string {
	if contentType == "image/jpg" {
		return ".jpg"
	}

	if contentType == "image/jpeg" {
		return ".jpeg"
	}

	if contentType == "image/png" {
		return ".png"
	}

	return ""
}
