package router

import (
	"fmt"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"net/http"

	"github.com/labstack/echo/v4"
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

func mapModelToGetUserByUsernameResponse(user *models.User) dto.GetUserByUsernameResponse {
	return dto.GetUserByUsernameResponse{
		Id:       user.Id.String(),
		Name:     user.Name,
		Email:    user.Email,
		Username: user.Username,
		Gender:   user.Gender,
		ContactInformation: dto.UserContactInformationDto{
			Email:   user.ContactInformation.Email,
			Phone:   user.ContactInformation.Phone,
			Address: user.ContactInformation.Address,
			Other:   user.ContactInformation.Other,
		},
		Location: dto.UserLocationDto{
			City:    user.Location.City,
			Country: user.Location.Country,
			Lat:     user.Location.Lat,
			Long:    user.Location.Long,
		},
		IsBusinessAccount: user.IsBusinessAccount,
		IsVerifiedAccount: user.IsVerifiedAccount,
		Description:       user.Description,
		AccountStatus:     user.AccountStatus,
	}
}
