package favorites

import (
	"context"
	"horizon/internal/db"
	"horizon/internal/pagination"
)

func (r *repository) createFavorite(userId string, dto CreateFavoriteRequestDto) (db.Favorite, error) {
	return r.db.Queries.CreateFavorite(context.Background(), db.CreateFavoriteParams{
		UserID:     userId,
		HserviceID: dto.HServiceId,
	})
}

func (r *repository) deleteFavorite(userId string, hserviceId string) error {
	return r.db.Queries.DeleteFavoriteByHServiceId(context.Background(), db.DeleteFavoriteByHServiceIdParams{
		UserID:     userId,
		HserviceID: hserviceId,
	})
}

func (r *repository) getFavoritesByUserId(
	userId string,
	params pagination.Params,
) ([]db.GetFavoritesByUserIdRow, error) {
	return r.db.Queries.GetFavoritesByUserId(context.Background(), db.GetFavoritesByUserIdParams{
		UserID: userId,
		Offset: int32(params.Offset),
		Limit:  int32(params.PageSize),
	})
}

func (r *repository) countUserFavorites(userId string) (int64, error) {
	return r.db.Queries.CountUserFavorites(context.Background(), userId)
}

func (r *repository) isFavorite(userId string, hserviceId string) bool {
	_, err := r.db.Queries.IsFavorite(context.Background(), db.IsFavoriteParams{
		HserviceID: hserviceId,
		UserID:     userId,
	})

	return err == nil
}

func (r *repository) getFavoritesByUsername(
	username string,
	params pagination.Params,
) ([]db.GetFavoritesByUsernameRow, error) {
	return r.db.Queries.GetFavoritesByUsername(context.Background(), db.GetFavoritesByUsernameParams{
		Username: username,
		Offset:   int32(params.Offset),
		Limit:    int32(params.PageSize),
	})
}

func (r *repository) countUserFavoritesByUsername(username string) (int64, error) {
	return r.db.Queries.CountUserFavoritesByUsername(context.Background(), username)
}
