package favorites

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

func (s *FavoritesService) HandlerCreateFavorite(c echo.Context) error {
	userId := c.Get("user_id").(string)
	dto := c.Get("body").(CreateFavoriteRequestDto)

	dbResult, err := s.Db.Queries.CreateFavorite(context.Background(), db.CreateFavoriteParams{
		UserID:     userId,
		HserviceID: dto.HServiceId,
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	id, _ := dbResult.ID.Value()
	idstr, _ := id.(string)

	return c.JSON(http.StatusCreated, h.Response[CreateFavoriteResponseDto]{
		"data": CreateFavoriteResponseDto{
			ID: idstr,
		},
	})
}

func (s *FavoritesService) HandlerDeleteFavorite(c echo.Context) error {
	userId := c.Get("user_id").(string)
	hserviceId := c.Param("hservice_id")

	if hserviceId == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "hservice_id is required",
		})
	}

	err := s.Db.Queries.DeleteFavoriteByHServiceId(context.Background(), db.DeleteFavoriteByHServiceIdParams{
		UserID:     userId,
		HserviceID: hserviceId,
	})

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}

func (s *FavoritesService) HandlerGetFavorites(c echo.Context) error {
	userId := c.Get("user_id").(string)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: err.Error(),
		})
	}

	favorites, err := s.Db.Queries.GetFavoritesByUserId(context.Background(), db.GetFavoritesByUserIdParams{
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

	count, err := s.Db.Queries.CountUserFavorites(context.Background(), userId)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}
		return echo.ErrInternalServerError
	}

	paginationData := pagination.GetPagination(params, count)

	res := make([]FavoritesResponseDto, 0)

	for _, favorite := range favorites {
		dto, err := mapFavoriteToFavoriteDto(favorite)

		if err != nil {
			return echo.ErrInternalServerError
		}

		res = append(res, dto)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]FavoritesResponseDto]{
		Data:       res,
		Pagination: paginationData,
	})

}

func (s *FavoritesService) HandlerGetIsFavorite(c echo.Context) error {
	userId := c.Get("user_id").(string)
	favoriteId := c.Param("id")
	parsed, _ := uuid.Parse(favoriteId)

	if favoriteId == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	_, err := s.Db.Queries.IsFavorite(context.Background(), db.IsFavoriteParams{
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

func (s *FavoritesService) HandlerGetFavoritesByUsername(c echo.Context) error {
	username := c.Param("username")
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: err.Error(),
		})
	}

	if username == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "username is required",
		})
	}

	favorites, err := s.Db.Queries.GetFavoritesByUsername(context.Background(), db.GetFavoritesByUsernameParams{
		Username: username,
		Offset:   int32(params.Offset),
		Limit:    int32(params.PageSize),
	})

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}
		return echo.ErrInternalServerError
	}

	count, err := s.Db.Queries.CountUserFavoritesByUsername(context.Background(), username)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}
		return echo.ErrInternalServerError
	}

	paginationData := pagination.GetPagination(params, count)

	res := make([]FavoritesResponseDto, 0)

	for _, favorite := range favorites {
		dto, err := mapFavoriteToFavoriteDtoByUsername(favorite)

		if err != nil {
			return echo.ErrInternalServerError
		}

		res = append(res, dto)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]FavoritesResponseDto]{
		Data:       res,
		Pagination: paginationData,
	})
}
