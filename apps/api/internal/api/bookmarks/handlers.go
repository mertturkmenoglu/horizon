package bookmarks

import (
	"context"
	"errors"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

func (s *BookmarksService) HandlerCreateBookmark(c echo.Context) error {
	userId := c.Get("user_id").(string)
	dto := c.Get("body").(CreateBookmarkRequestDto)

	dbResult, err := s.Db.Queries.CreateBookmark(context.Background(), db.CreateBookmarkParams{
		UserID:     userId,
		HserviceID: dto.HServiceId,
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	id, _ := dbResult.ID.Value()
	idstr, _ := id.(string)

	return c.JSON(http.StatusCreated, h.Response[CreateBookmarkResponseDto]{
		"data": CreateBookmarkResponseDto{
			ID: idstr,
		},
	})
}

func (s *BookmarksService) HandlerDeleteBookmark(c echo.Context) error {
	userId := c.Get("user_id").(string)
	bookmarkId := c.Param("id")
	parsed, _ := uuid.Parse(bookmarkId)

	if bookmarkId == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	err := s.Db.Queries.DeleteBookmarkById(context.Background(), db.DeleteBookmarkByIdParams{
		ID:     pgtype.UUID{Bytes: [16]byte(parsed), Valid: true},
		UserID: userId,
	})

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}

func (s *BookmarksService) HandlerGetBookmarks(c echo.Context) error {
	userId := c.Get("user_id").(string)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: err.Error(),
		})
	}

	bookmarks, err := s.Db.Queries.GetBookmarksByUserId(context.Background(), db.GetBookmarksByUserIdParams{
		UserID: userId,
		Offset: int32(params.Offset),
		Limit:  int32(params.PageSize),
	})

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}
		return echo.ErrInternalServerError
	}

	count, err := s.Db.Queries.CountUserBookmarks(context.Background(), userId)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}
		return echo.ErrInternalServerError
	}

	paginationData := pagination.GetPagination(params, count)

	res := make([]BookmarksResponseDto, 0)

	for _, bookmark := range bookmarks {
		dto, err := mapBookmarkToBookmarkDto(bookmark)

		if err != nil {
			return echo.ErrInternalServerError
		}

		res = append(res, dto)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]BookmarksResponseDto]{
		Data:       res,
		Pagination: paginationData,
	})

}

func (s *BookmarksService) HandlerGetIsBookmarked(c echo.Context) error {
	userId := c.Get("user_id").(string)
	bookmarkId := c.Param("id")
	parsed, _ := uuid.Parse(bookmarkId)

	if bookmarkId == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	_, err := s.Db.Queries.IsBookmarked(context.Background(), db.IsBookmarkedParams{
		ID:     pgtype.UUID{Bytes: [16]byte(parsed), Valid: true},
		UserID: userId,
	})

	if err != nil {
		return c.JSON(http.StatusOK, h.AnyResponse{
			"data": false,
		})
	}

	return c.JSON(http.StatusOK, h.AnyResponse{
		"data": true,
	})
}
