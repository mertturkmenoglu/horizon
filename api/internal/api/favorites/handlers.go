package favorites

import (
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *handlers) CreateFavorite(c echo.Context) error {
	userId := c.Get("user_id").(string)
	dto := c.Get("body").(CreateFavoriteRequestDto)

	res, err := s.service.createFavorite(userId, dto)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusCreated, h.Response[CreateFavoriteResponseDto]{
		Data: res,
	})
}

func (s *handlers) DeleteFavorite(c echo.Context) error {
	userId := c.Get("user_id").(string)
	hserviceId := c.Param("hservice_id")

	if hserviceId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errHServiceIdRequired.Error())
	}

	err := s.service.deleteFavorite(userId, hserviceId)

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}

func (s *handlers) GetFavorites(c echo.Context) error {
	userId := c.Get("user_id").(string)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, pagination, err := s.service.getUserFavorites(userId, params)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]FavoritesResponseDto]{
		Data:       res,
		Pagination: *pagination,
	})
}

func (s *handlers) GetIsFavorite(c echo.Context) error {
	userId := c.Get("user_id").(string)
	hserviceId := c.Param("hservice_id")

	if hserviceId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errHServiceIdRequired.Error())
	}

	res := s.service.isFavorite(userId, hserviceId)

	return c.JSON(http.StatusOK, h.Response[bool]{
		Data: res,
	})
}

func (s *handlers) GetFavoritesByUsername(c echo.Context) error {
	username := c.Param("username")
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errUsernameRequired.Error())
	}

	res, pagination, err := s.service.getFavoritesByUsername(username, params)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]FavoritesResponseDto]{
		Data:       res,
		Pagination: *pagination,
	})
}
