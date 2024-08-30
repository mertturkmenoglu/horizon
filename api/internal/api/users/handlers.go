package users

import (
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Get User Profile By Username godoc
//
//	@Summary		Get user profile by username
//	@Description	Gets a user profile by username
//	@Tags			Users
//	@Accept			json
//	@Produce		json
//	@Param			username	path	string	true	"Username"
//	@Success		200	{object}	h.R{data=GetUserProfileByUsernameResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Router			/users/{username} [get]
func (s *handlers) GetUserProfileByUsername(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errUsernameRequired.Error())
	}

	res, err := s.service.getUserProfileByUsername(username)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.R{
		Data: *res,
	})
}
