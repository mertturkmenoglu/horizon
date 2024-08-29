package bookmarks

import (
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Create Bookmark godoc
//
//	@Summary		Create a new bookmark
//	@Description	Creates a new bookmark with the given HService ID for the current user
//	@Tags			Bookmarks
//	@Accept			json
//	@Produce		json
//	@Param			body	body	CreateBookmarkRequestDto	true	"Request body"
//	@Success		201	{object}	h.Response[CreateBookmarkResponseDto]	"Successful request"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/bookmarks [post]
func (s *handlers) HandlerCreateBookmark(c echo.Context) error {
	userId := c.Get("user_id").(string)
	dto := c.Get("body").(CreateBookmarkRequestDto)
	res, err := s.service.createBookmark(userId, dto)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusCreated, h.Response[CreateBookmarkResponseDto]{
		Data: res,
	})
}

// Delete Bookmark godoc
//
//	@Summary		Delete a bookmark
//	@Description	Deletes a bookmark with the given HService ID for the current user
//	@Tags			Bookmarks
//	@Param			hservice_id	path	string	true	"HService ID"
//	@Success		204
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Security		CookieAuth
//	@Router			/bookmarks/{hservice_id} [delete]
func (s *handlers) HandlerDeleteBookmark(c echo.Context) error {
	userId := c.Get("user_id").(string)
	hserviceId := c.Param("hservice_id")

	if hserviceId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errHServiceIdRequired.Error())
	}

	err := s.service.deleteBookmark(userId, hserviceId)

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}

// Get Bookmarks godoc
//
//	@Summary		Get bookmarks
//	@Description	Gets all bookmarks for the current user
//	@Tags			Bookmarks
//	@Accept			json
//	@Produce		json
//	@Param			page	query	int	false	"Page number"
//	@Param			pageSize	query	int	false	"Page size"
//	@Success		200	{object}	h.PaginatedResponse[[]BookmarksResponseDto]	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		404 {object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/bookmarks [get]
func (s *handlers) HandlerGetBookmarks(c echo.Context) error {
	userId := c.Get("user_id").(string)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, pagination, err := s.service.getBookmarks(userId, params)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]BookmarksResponseDto]{
		Data:       res,
		Pagination: *pagination,
	})
}

// Get Is Bookmarked godoc
//
//	@Summary		Check if a bookmark exists
//	@Description	Checks if a bookmark exists for the current user
//	@Tags			Bookmarks
//	@Accept			json
//	@Produce		json
//	@Param			hservice_id	path	string	true	"HService ID"
//	@Success		200	{object}	h.Response[bool]	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Security		CookieAuth
//	@Router			/bookmarks/{hservice_id} [get]
func (s *handlers) HandlerGetIsBookmarked(c echo.Context) error {
	userId := c.Get("user_id").(string)
	hserviceId := c.Param("hservice_id")

	if hserviceId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errHServiceIdRequired.Error())
	}

	res := s.service.getIsBookmarked(userId, hserviceId)

	return c.JSON(http.StatusOK, h.Response[bool]{
		Data: res,
	})
}
