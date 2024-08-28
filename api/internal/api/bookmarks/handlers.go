package bookmarks

import (
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/labstack/echo/v4"
)

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
