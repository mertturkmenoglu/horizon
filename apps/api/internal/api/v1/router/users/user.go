package users

import (
	"context"
	"fmt"
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"horizon/internal/upload"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/minio/minio-go/v7"
	"github.com/spf13/viper"
)

func GetMe(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)

	var user *models.User

	res := db.Client.
		Find(&user, "username = ?", auth.Username).
		Preload("ContactInformation").
		Preload("Location")

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return echo.NewHTTPError(http.StatusNotFound, fmt.Sprintf("cannot found user with username: %s", auth.Username))
		}

		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
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

	var user *models.User

	res := db.Client.
		Find(&user, "username = ?", username).
		Preload("ContactInformation").
		Preload("Location")

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return echo.NewHTTPError(http.StatusNotFound, fmt.Sprintf("cannot found user with username: %s", username))
		}

		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}

	return c.JSON(http.StatusOK, h.Response[dto.GetUserByUsernameResponse]{
		"data": mapModelToGetUserByUsernameResponse(user),
	})
}

func UpdateMe(c echo.Context) error {
	return echo.NewHTTPError(http.StatusNotImplemented)
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
	objectName := fmt.Sprintf("%s%s", auth.AuthId, ext)

	ctx := context.Background()
	bucket := viper.GetString("minio.buckets.profile-images")

	info, err := upload.Client().
		PutObject(ctx, bucket, objectName, src, -1, minio.PutObjectOptions{
			ContentType: contentType,
		})

	db.Client.Model(&models.User{}).
		Where("id = ?", auth.UserId).
		Update("profile_image", info.Location)

	return c.JSON(http.StatusOK, h.Response[any]{
		"data": info.Location,
	})
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
