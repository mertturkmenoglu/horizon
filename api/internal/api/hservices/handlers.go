package hservices

import (
	"context"
	"errors"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"
	"time"

	"github.com/gosimple/slug"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

func (s *Module) HandlerCreateHService(c echo.Context) error {
	dto := c.Get("body").(CreateHServiceRequestDto)
	userId := c.Get("user_id").(string)

	// Perform additional validations
	deliveryTimespanOk := isValidTimespan(dto.DeliveryTimespan)
	priceTimespanOk := isValidTimespan(dto.PriceTimespan)
	priceUnitOk := isValidPriceUnit(dto.PriceUnit)
	mediaOk := isValidMedia(dto.Media)

	if !deliveryTimespanOk || !priceTimespanOk || !priceUnitOk || !mediaOk {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "Invalid value",
		})
	}

	id := h.GenerateId(s.Flake)

	var isOnline = false

	if dto.IsOnline != nil {
		isOnline = *dto.IsOnline
	}

	saved, err := s.Db.Queries.CreateHService(context.Background(), db.CreateHServiceParams{
		ID:               id,
		UserID:           userId,
		Title:            dto.Title,
		Slug:             slug.Make(dto.Title),
		Description:      dto.Description,
		Category:         int32(dto.Category),
		Price:            dto.Price,
		PriceUnit:        db.Priceunit(dto.PriceUnit),
		PriceTimespan:    db.Worktimespan(dto.PriceTimespan),
		IsOnline:         isOnline,
		Url:              pgtype.Text{String: *dto.Url, Valid: dto.Url != nil},
		Location:         dto.Location,
		DeliveryTime:     int32(dto.DeliveryTime),
		DeliveryTimespan: db.Worktimespan(dto.DeliveryTimespan),
		TotalPoints:      0,
		TotalVotes:       0,
		Media:            []byte(dto.Media),
		CreatedAt:        pgtype.Timestamptz{Time: time.Now(), Valid: true},
		UpdatedAt:        pgtype.Timestamptz{Time: time.Now(), Valid: true},
	})

	if err != nil {
		return c.JSON(http.StatusInternalServerError, h.ErrResponse{
			Message: err.Error(),
		})
	}

	res, err := mapHServiceToWithoutUserDto(saved)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[HServiceWithoutUserResponseDto]{
		Data: res,
	})
}

func (s *Module) HandlerGetMyHServices(c echo.Context) error {
	userId := c.Get("user_id").(string)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: err.Error(),
		})
	}

	hservices, err := s.Db.Queries.GetMyHServices(context.Background(), db.GetMyHServicesParams{
		UserID: userId,
		Offset: int32(params.Offset),
		Limit:  int32(params.PageSize),
	})

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "Not found",
			})
		} else {
			return echo.ErrInternalServerError
		}
	}

	count, err := s.Db.Queries.CountMyHServices(context.Background(), userId)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "Not found",
			})
		} else {
			return echo.ErrInternalServerError
		}
	}

	paginationData := pagination.GetPagination(params, count)

	res := make([]HServiceWithoutUserResponseDto, 0)

	for _, hservice := range hservices {
		dto, err := mapHServiceToWithoutUserDto(hservice)

		if err != nil {
			return echo.ErrInternalServerError
		}

		res = append(res, dto)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]HServiceWithoutUserResponseDto]{
		Data:       res,
		Pagination: paginationData,
	})
}

func (s *Module) HandlerGetHServiceById(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	dbResult, err := s.Db.Queries.GetHServiceById(context.Background(), id)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		} else {
			return echo.ErrInternalServerError
		}
	}

	res, err := mapRowToDto(Row{
		Hservice: dbResult.Hservice,
		User:     dbResult.User,
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	var isFavorite = false
	var isBookmarked = false

	if userId != "" {
		favId, _ := s.Db.Queries.IsFavorite(context.Background(), db.IsFavoriteParams{
			HserviceID: id,
			UserID:     userId,
		})

		bookmarkId, _ := s.Db.Queries.IsBookmarked(context.Background(), db.IsBookmarkedParams{
			HserviceID: id,
			UserID:     userId,
		})

		isFavorite = favId.Valid
		isBookmarked = bookmarkId.Valid
	}

	return c.JSON(http.StatusOK, h.MetadataResponse[HServiceResponseDto, HServiceMetadataDto]{
		Data: res,
		Meta: HServiceMetadataDto{
			IsFavorite:   isFavorite,
			IsBookmarked: isBookmarked,
		},
	})
}

func (s *Module) HandlerGetHServicesByUsername(c echo.Context) error {
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

	hservices, err := s.Db.Queries.GetHServicesByUsername(context.Background(), db.GetHServicesByUsernameParams{
		Username: username,
		Offset:   int32(params.Offset),
		Limit:    int32(params.PageSize),
	})

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		} else {
			return echo.ErrInternalServerError
		}
	}

	count, err := s.Db.Queries.CountHServicesByUsername(context.Background(), username)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		} else {
			return echo.ErrInternalServerError
		}
	}

	paginationData := pagination.GetPagination(params, count)

	res := make([]HServiceResponseDto, 0)

	for _, hservice := range hservices {
		dto, err := mapRowToDto(Row{
			Hservice: hservice.Hservice,
			User:     hservice.User,
		})

		if err != nil {
			return echo.ErrInternalServerError
		}

		res = append(res, dto)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]HServiceResponseDto]{
		Data:       res,
		Pagination: paginationData,
	})
}
