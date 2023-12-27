package router

import (
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
	res := db.Client.Find(&user, "id = ?", auth.UserId)

	if res.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error)
	}

	return c.JSON(http.StatusOK, h.Response{
		"data": user,
	})
}
