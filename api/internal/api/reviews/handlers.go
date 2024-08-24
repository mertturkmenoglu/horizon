package reviews

import (
	"context"
	"errors"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

func (s *Module) HandlerGetReviewsByHServiceId(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: err.Error(),
		})
	}

	dbResult, err := s.Db.Queries.GetReviewsByHServiceId(context.Background(), db.GetReviewsByHServiceIdParams{
		HserviceID: id,
		Offset:     int32(params.Offset),
		Limit:      int32(params.PageSize),
	})

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}

		return echo.ErrInternalServerError
	}

	count, err := s.Db.Queries.CountReviewsByHServiceId(context.Background(), id)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}

		return echo.ErrInternalServerError
	}

	paginationData := pagination.GetPagination(params, count)

	res, err := mapGetReviewsByHServiceIdToDto(dbResult)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[GetReviewsByHServiceIdResponseDto]{
		Data:       res,
		Pagination: paginationData,
	})
}

func (s *Module) HandlerGetReviewsByUsername(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "username is required",
		})
	}

	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: err.Error(),
		})
	}

	dbResult, err := s.Db.Queries.GetReviewsByUsername(context.Background(), db.GetReviewsByUsernameParams{
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

	res, err := mapGetReviewsByUsernameToDto(dbResult)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[GetReviewsByUsernameResponseDto]{
		Data: res,
	})
}

func (s *Module) HandlerGetReviewById(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	dbResult, err := s.Db.Queries.GetReviewById(context.Background(), id)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}

		return echo.ErrInternalServerError
	}

	res, err := mapGetReviewByIdToDto(dbResult)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[ReviewItemDto]{
		Data: res,
	})
}

func (s *Module) HandlerCreateReview(c echo.Context) error {
	return echo.ErrNotImplemented
}

func (s *Module) HandlerDeleteReview(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	err := s.Db.Queries.DeleteReviewById(context.Background(), db.DeleteReviewByIdParams{
		ID:     id,
		UserID: userId,
	})

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}

func (s *Module) HandlerCreateReviewVote(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	dto := c.Get("body").(CreateReviewVoteRequestDto)

	var reviewVoteType db.Reviewvotetype = db.ReviewvotetypeLIKE

	if dto.VoteType == "DISLIKE" {
		reviewVoteType = db.ReviewvotetypeDISLIKE
	} else if dto.VoteType == "LIKE" {
		reviewVoteType = db.ReviewvotetypeLIKE
	} else {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "voteType is invalid",
		})
	}

	_, err := s.Db.Queries.CreateReviewVote(context.Background(), db.CreateReviewVoteParams{
		ID:       h.GenerateId(s.Flake),
		UserID:   userId,
		ReviewID: id,
		VoteType: reviewVoteType,
	})

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusCreated)
}

func (s *Module) HandlerDeleteReviewVote(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	err := s.Db.Queries.DeleteReviewVoteById(context.Background(), db.DeleteReviewVoteByIdParams{
		ID:     id,
		UserID: userId,
	})

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}
