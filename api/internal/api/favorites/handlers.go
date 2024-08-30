package favorites

import (
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Create Favorite godoc
//
//	@Summary		Create a new favorite
//	@Description	Creates a new favorite with the given HService ID for the current user
//	@Tags			Favorites
//	@Accept			json
//	@Produce		json
//	@Param			body	body	CreateFavoriteRequestDto	true	"Request body"
//	@Success		201	{object}	h.Response[CreateFavoriteResponseDto]	"Successful request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/favorites [post]
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

// Delete Favorite godoc
//
//	@Summary		Delete a favorite
//	@Description	Deletes a favorite with the given HService ID for the current user
//	@Tags			Favorites
//	@Param			hservice_id	path	string	true	"HService ID"
//	@Success		204
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Security		CookieAuth
//	@Router			/favorites/{hservice_id} [delete]
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

// Get Favorites godoc
//
//	@Summary		Get favorites
//	@Description	Gets all favorites for the current user
//	@Tags			Favorites
//	@Accept			json
//	@Produce		json
//	@Param			page	query	int	false	"Page number"
//	@Param			pageSize	query	int	false	"Page size"
//	@Success		200	{object}	h.PaginatedResponse[[]FavoritesResponseDto]	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/favorites [get]
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

// Check if Favorite Exists godoc
//
//	@Summary		Check if a favorite exists
//	@Description	Checks if a favorite exists for the current user
//	@Tags			Favorites
//	@Accept			json
//	@Produce		json
//	@Param			hservice_id	path	string	true	"HService ID"
//	@Success		200	{object}	h.Response[bool]	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Security		CookieAuth
//	@Router			/favorites/{hservice_id} [get]
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

// Get Favorites by Username godoc
//
//	@Summary		Get favorites by username
//	@Description	Gets all favorites for the current user
//	@Tags			Favorites
//	@Accept			json
//	@Produce		json
//	@Param			username	path	string	true	"Username"
//	@Param			page	query	int	false	"Page number"
//	@Param			pageSize	query	int	false	"Page size"
//	@Success		200	{object}	h.PaginatedResponse[[]FavoritesResponseDto]	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/favorites/username/{username} [get]
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
