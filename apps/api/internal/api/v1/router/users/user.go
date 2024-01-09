package users

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/cache"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"net/http"

	"github.com/labstack/echo/v4"
)

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
	err := updateProfile(auth.Username, body)

	if err != nil {
		return err
	}

	cacheDelete(auth.Username)
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

	contentType := file.Header.Get("Content-Type")
	err = checkFile(file)

	if err != nil {
		return err
	}

	info, err := putFile(auth.Username, contentType, src)

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	err = updateProfileImage(auth.UserId, info.Location)
	_ = cache.Del("user:" + auth.Username)

	return c.JSON(http.StatusOK, h.Response[any]{
		"data": info.Location,
	})
}

func UpdateMyLocation(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.UpdateLocationRequest)
	userId := auth.UserId
	err := upsertLocation(userId, body)

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	_ = cache.Del("user:" + auth.Username)
	return c.NoContent(http.StatusOK)
}

func UpdateMyContactInformation(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.UpdateContactInformationRequest)
	userId := auth.UserId
	err := upsertContact(userId, body)

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	_ = cache.Del("user:" + auth.Username)
	return c.NoContent(http.StatusOK)
}
