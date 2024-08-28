package bookmarks

import (
	"context"
	"horizon/internal/db"
	"horizon/internal/pagination"
)

func (r *repository) createBookmark(userId string, dto CreateBookmarkRequestDto) (db.Bookmark, error) {
	return r.db.Queries.CreateBookmark(context.Background(), db.CreateBookmarkParams{
		UserID:     userId,
		HserviceID: dto.HServiceId,
	})
}

func (r *repository) deleteBookmark(userId string, hserviceId string) error {
	return r.db.Queries.DeleteBookmarkByHServiceId(context.Background(), db.DeleteBookmarkByHServiceIdParams{
		UserID:     userId,
		HserviceID: hserviceId,
	})
}

func (r *repository) getBookmarksByUserId(
	userId string,
	params pagination.Params,
) ([]db.GetBookmarksByUserIdRow, error) {
	return r.db.Queries.GetBookmarksByUserId(context.Background(), db.GetBookmarksByUserIdParams{
		UserID: userId,
		Offset: int32(params.Offset),
		Limit:  int32(params.PageSize),
	})
}

func (r *repository) countUserBookmarks(userId string) (int64, error) {
	return r.db.Queries.CountUserBookmarks(context.Background(), userId)
}

func (r *repository) isBookmarked(userId string, hserviceId string) bool {
	_, err := r.db.Queries.IsBookmarked(context.Background(), db.IsBookmarkedParams{
		HserviceID: hserviceId,
		UserID:     userId,
	})

	return err == nil
}
