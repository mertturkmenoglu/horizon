package reviews

import (
	"context"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/pagination"
)

func (r *repository) getReviewsByHServiceId(id string, params pagination.Params) ([]db.GetReviewsByHServiceIdRow, error) {
	return r.db.Queries.GetReviewsByHServiceId(context.Background(), db.GetReviewsByHServiceIdParams{
		HserviceID: id,
		Offset:     int32(params.Offset),
		Limit:      int32(params.PageSize),
	})
}

func (r *repository) countReviewsByHServiceId(id string) (int64, error) {
	return r.db.Queries.CountReviewsByHServiceId(context.Background(), id)
}

func (r *repository) getReviewsByUsername(username string, params pagination.Params) ([]db.GetReviewsByUsernameRow, error) {
	return r.db.Queries.GetReviewsByUsername(context.Background(), db.GetReviewsByUsernameParams{
		Username: username,
		Offset:   int32(params.Offset),
		Limit:    int32(params.PageSize),
	})
}

func (r *repository) countReviewsByUsername(username string) (int64, error) {
	return r.db.Queries.CountReviewsByUsername(context.Background(), username)
}

func (r *repository) getReviewById(id string) (db.GetReviewByIdRow, error) {
	return r.db.Queries.GetReviewById(context.Background(), id)
}

func (r *repository) createReview(userId string, dto CreateReviewRequestDto) (db.Review, error) {
	return r.db.Queries.CreateReview(context.Background(), db.CreateReviewParams{
		ID:         h.GenerateId(r.flake),
		UserID:     userId,
		HserviceID: dto.HServiceID,
		Rating:     dto.Rating,
		Comment:    dto.Comment,
		Media:      []byte(dto.Media),
	})
}

func (r *repository) deleteReviewById(id string, userId string) error {
	return r.db.Queries.DeleteReviewById(context.Background(), db.DeleteReviewByIdParams{
		ID:     id,
		UserID: userId,
	})
}

func (r *repository) createReviewVote(id string, userId string, reviewVoteType db.Reviewvotetype) (db.ReviewsVote, error) {
	return r.db.Queries.CreateReviewVote(context.Background(), db.CreateReviewVoteParams{
		ID:       h.GenerateId(r.flake),
		UserID:   userId,
		ReviewID: id,
		VoteType: reviewVoteType,
	})
}

func (r *repository) deleteReviewVoteById(id string, userId string) error {
	return r.db.Queries.DeleteReviewVoteById(context.Background(), db.DeleteReviewVoteByIdParams{
		ID:     id,
		UserID: userId,
	})
}
