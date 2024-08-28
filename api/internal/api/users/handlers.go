package users

import (
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *handlers) GetUserProfileByUsername(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errUsernameRequired.Error())
	}

	res, err := s.service.getUserProfileByUsername(username)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.Response[GetUserProfileByUsernameResponseDto]{
		Data: *res,
	})
}
