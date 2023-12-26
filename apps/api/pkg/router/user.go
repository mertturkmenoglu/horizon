package router

import (
	"horizon/pkg/db"
	"horizon/pkg/db/models"
	"horizon/pkg/h"
	"horizon/pkg/jsonwebtoken"
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
