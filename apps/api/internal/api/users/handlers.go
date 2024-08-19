package users

import (
	"context"
	"errors"
	"horizon/internal/h"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

func (s *UsersService) HandlerGetUserProfileByUsername(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "username is required",
		})
	}

	dbResult, err := s.Db.Queries.GetUserProfileByUsername(context.Background(), username)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		} else {
			return echo.ErrInternalServerError
		}
	}

	res := mapGetUserProfileByUsernameRowToDto(dbResult)

	return c.JSON(http.StatusOK, h.Response[GetUserProfileByUsernameResponseDto]{
		Data: res,
	})
}
