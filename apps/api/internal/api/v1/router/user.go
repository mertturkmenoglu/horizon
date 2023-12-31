package router

import (
	"fmt"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/db/query"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetMe(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)

	var user *models.User
	res := db.Client.Find(&user, "id = ?", auth.UserId).
		Preload("ContactInformation").
		Preload("Location")

	if res.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error)
	}

	return c.JSON(http.StatusOK, h.Response{
		"data": user,
	})
}

func GetUserByUsername(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "username is required")
	}

	user, err := query.GetUserByUsername(username)

	if err != nil {
		if db.IsNotFoundError(err) {
			return echo.NewHTTPError(http.StatusNotFound, fmt.Sprintf("cannot found user with username: %s", username))
		}

		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, h.Response{
		"data": user,
	})
}
