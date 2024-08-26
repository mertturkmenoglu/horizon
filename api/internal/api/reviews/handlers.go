package reviews

import (
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *handlers) getReviewsByHServiceId(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired)
	}

	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, pagination, err := s.service.getHServiceReviews(id, params)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[GetReviewsByHServiceIdResponseDto]{
		Data:       *res,
		Pagination: *pagination,
	})
}

func (s *handlers) getReviewsByUsername(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errUsernameRequired)
	}

	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, pagination, err := s.service.getUserReviews(username, params)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[GetReviewsByUsernameResponseDto]{
		Data:       *res,
		Pagination: *pagination,
	})
}

func (s *handlers) getReviewById(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired)
	}

	res, err := s.service.getReview(id)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.Response[ReviewItemDto]{
		Data: *res,
	})
}

func (s *handlers) createReview(c echo.Context) error {
	userId := c.Get("user_id").(string)
	dto := c.Get("body").(CreateReviewRequestDto)

	res, err := s.service.createReview(userId, dto)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusCreated, h.Response[CreateReviewResponseDto]{
		Data: *res,
	})
}

func (s *handlers) deleteReview(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired)
	}

	err := s.service.deleteReview(id, userId)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.NoContent(http.StatusNoContent)
}

func (s *handlers) createReviewVote(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired)
	}

	dto := c.Get("body").(CreateReviewVoteRequestDto)
	err := s.service.createReviewVote(id, userId, dto)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.NoContent(http.StatusCreated)
}

func (s *handlers) deleteReviewVote(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired)
	}

	err := s.service.deleteReviewVote(id, userId)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.NoContent(http.StatusNoContent)
}
