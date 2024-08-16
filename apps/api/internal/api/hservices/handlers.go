package hservices

import (
	"context"
	"horizon/internal/db"
	"horizon/internal/h"
	"net/http"
	"time"

	"github.com/gosimple/slug"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/sony/sonyflake"
)

type HServicesService struct {
	Db    *db.Db
	Flake *sonyflake.Sonyflake
}

func NewHServicesService(database *db.Db, flake *sonyflake.Sonyflake) *HServicesService {
	return &HServicesService{
		Db:    database,
		Flake: flake,
	}
}

func (s *HServicesService) HandlerCreateHService(c echo.Context) error {
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

	return c.JSON(http.StatusOK, h.AnyResponse{
		"data": saved,
	})
}
