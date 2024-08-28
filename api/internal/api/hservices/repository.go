package hservices

import (
	"context"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/pagination"
	"time"

	"github.com/gosimple/slug"
	"github.com/jackc/pgx/v5/pgtype"
)

func (r *repository) createHService(
	userId string,
	dto CreateHServiceRequestDto,
) (db.Hservice, error) {
	id := h.GenerateId(r.flake)

	var isOnline = false

	if dto.IsOnline != nil {
		isOnline = *dto.IsOnline
	}

	return r.db.Queries.CreateHService(context.Background(), db.CreateHServiceParams{
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
}

func (r *repository) getMyHServices(
	userId string,
	params pagination.Params,
) ([]db.Hservice, error) {
	return r.db.Queries.GetMyHServices(context.Background(), db.GetMyHServicesParams{
		UserID: userId,
		Offset: int32(params.Offset),
		Limit:  int32(params.PageSize),
	})
}

func (r *repository) countMyHServices(userId string) (int64, error) {
	return r.db.Queries.CountMyHServices(context.Background(), userId)
}

func (r *repository) getHServiceById(id string) (db.GetHServiceByIdRow, error) {
	return r.db.Queries.GetHServiceById(context.Background(), id)
}

func (r *repository) isFavorite(userId string, hserviceId string) bool {
	_, err := r.db.Queries.IsFavorite(context.Background(), db.IsFavoriteParams{
		HserviceID: hserviceId,
		UserID:     userId,
	})

	return err == nil
}

func (r *repository) isBookmarked(userId string, hserviceId string) bool {
	_, err := r.db.Queries.IsBookmarked(context.Background(), db.IsBookmarkedParams{
		HserviceID: hserviceId,
		UserID:     userId,
	})

	return err == nil
}

func (r *repository) getHServicesByUsername(
	username string,
	params pagination.Params,
) ([]db.GetHServicesByUsernameRow, error) {
	return r.db.Queries.GetHServicesByUsername(context.Background(), db.GetHServicesByUsernameParams{
		Username: username,
		Offset:   int32(params.Offset),
		Limit:    int32(params.PageSize),
	})
}

func (r *repository) countHServicesByUsername(username string) (int64, error) {
	return r.db.Queries.CountHServicesByUsername(context.Background(), username)
}
