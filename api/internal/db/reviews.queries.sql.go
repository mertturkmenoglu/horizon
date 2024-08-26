// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: reviews.queries.sql

package db

import (
	"context"
)

const countReviewsByHServiceId = `-- name: CountReviewsByHServiceId :one
SELECT COUNT(*) FROM reviews
WHERE hservice_id = $1
`

func (q *Queries) CountReviewsByHServiceId(ctx context.Context, hserviceID string) (int64, error) {
	row := q.db.QueryRow(ctx, countReviewsByHServiceId, hserviceID)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const countReviewsByUsername = `-- name: CountReviewsByUsername :one
SELECT COUNT(*) FROM reviews
WHERE user_id = (SELECT id FROM users WHERE username = $1)
`

func (q *Queries) CountReviewsByUsername(ctx context.Context, username string) (int64, error) {
	row := q.db.QueryRow(ctx, countReviewsByUsername, username)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const createReview = `-- name: CreateReview :one
INSERT INTO reviews (
  id,
  user_id,
  hservice_id,
  rating,
  comment,
  media
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6
)
RETURNING id, user_id, hservice_id, rating, comment, media, like_count, dislike_count, created_at, updated_at
`

type CreateReviewParams struct {
	ID         string
	UserID     string
	HserviceID string
	Rating     int16
	Comment    string
	Media      []byte
}

func (q *Queries) CreateReview(ctx context.Context, arg CreateReviewParams) (Review, error) {
	row := q.db.QueryRow(ctx, createReview,
		arg.ID,
		arg.UserID,
		arg.HserviceID,
		arg.Rating,
		arg.Comment,
		arg.Media,
	)
	var i Review
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.HserviceID,
		&i.Rating,
		&i.Comment,
		&i.Media,
		&i.LikeCount,
		&i.DislikeCount,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createReviewVote = `-- name: CreateReviewVote :one
INSERT INTO reviews_votes (
  id,
  user_id,
  review_id,
  vote_type
) VALUES (
  $1,
  $2,
  $3,
  $4
)
RETURNING id, user_id, review_id, vote_type, created_at
`

type CreateReviewVoteParams struct {
	ID       string
	UserID   string
	ReviewID string
	VoteType Reviewvotetype
}

func (q *Queries) CreateReviewVote(ctx context.Context, arg CreateReviewVoteParams) (ReviewsVote, error) {
	row := q.db.QueryRow(ctx, createReviewVote,
		arg.ID,
		arg.UserID,
		arg.ReviewID,
		arg.VoteType,
	)
	var i ReviewsVote
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.ReviewID,
		&i.VoteType,
		&i.CreatedAt,
	)
	return i, err
}

const deleteReviewById = `-- name: DeleteReviewById :exec
DELETE FROM reviews
WHERE id = $1 AND user_id = $2
`

type DeleteReviewByIdParams struct {
	ID     string
	UserID string
}

func (q *Queries) DeleteReviewById(ctx context.Context, arg DeleteReviewByIdParams) error {
	_, err := q.db.Exec(ctx, deleteReviewById, arg.ID, arg.UserID)
	return err
}

const deleteReviewVoteById = `-- name: DeleteReviewVoteById :exec
DELETE FROM reviews_votes
WHERE id = $1 AND user_id = $2
`

type DeleteReviewVoteByIdParams struct {
	ID     string
	UserID string
}

func (q *Queries) DeleteReviewVoteById(ctx context.Context, arg DeleteReviewVoteByIdParams) error {
	_, err := q.db.Exec(ctx, deleteReviewVoteById, arg.ID, arg.UserID)
	return err
}

const getReviewById = `-- name: GetReviewById :one
SELECT reviews.id, reviews.user_id, reviews.hservice_id, reviews.rating, reviews.comment, reviews.media, reviews.like_count, reviews.dislike_count, reviews.created_at, reviews.updated_at, users.id, users.email, users.username, users.full_name, users.password_hash, users.google_id, users.is_email_verified, users.is_active, users.role, users.password_reset_token, users.password_reset_expires, users.login_attempts, users.lockout_until, users.gender, users.profile_image, users.last_login, users.created_at, users.updated_at, hservices.id, hservices.user_id, hservices.title, hservices.slug, hservices.description, hservices.category, hservices.price, hservices.price_unit, hservices.price_timespan, hservices.is_online, hservices.url, hservices.location, hservices.delivery_time, hservices.delivery_timespan, hservices.total_points, hservices.total_votes, hservices.media, hservices.created_at, hservices.updated_at FROM reviews
LEFT JOIN users ON users.id = reviews.user_id
LEFT JOIN hservices ON hservices.id = reviews.hservice_id
WHERE reviews.id = $1
LIMIT 1
`

type GetReviewByIdRow struct {
	Review   Review
	User     User
	Hservice Hservice
}

func (q *Queries) GetReviewById(ctx context.Context, id string) (GetReviewByIdRow, error) {
	row := q.db.QueryRow(ctx, getReviewById, id)
	var i GetReviewByIdRow
	err := row.Scan(
		&i.Review.ID,
		&i.Review.UserID,
		&i.Review.HserviceID,
		&i.Review.Rating,
		&i.Review.Comment,
		&i.Review.Media,
		&i.Review.LikeCount,
		&i.Review.DislikeCount,
		&i.Review.CreatedAt,
		&i.Review.UpdatedAt,
		&i.User.ID,
		&i.User.Email,
		&i.User.Username,
		&i.User.FullName,
		&i.User.PasswordHash,
		&i.User.GoogleID,
		&i.User.IsEmailVerified,
		&i.User.IsActive,
		&i.User.Role,
		&i.User.PasswordResetToken,
		&i.User.PasswordResetExpires,
		&i.User.LoginAttempts,
		&i.User.LockoutUntil,
		&i.User.Gender,
		&i.User.ProfileImage,
		&i.User.LastLogin,
		&i.User.CreatedAt,
		&i.User.UpdatedAt,
		&i.Hservice.ID,
		&i.Hservice.UserID,
		&i.Hservice.Title,
		&i.Hservice.Slug,
		&i.Hservice.Description,
		&i.Hservice.Category,
		&i.Hservice.Price,
		&i.Hservice.PriceUnit,
		&i.Hservice.PriceTimespan,
		&i.Hservice.IsOnline,
		&i.Hservice.Url,
		&i.Hservice.Location,
		&i.Hservice.DeliveryTime,
		&i.Hservice.DeliveryTimespan,
		&i.Hservice.TotalPoints,
		&i.Hservice.TotalVotes,
		&i.Hservice.Media,
		&i.Hservice.CreatedAt,
		&i.Hservice.UpdatedAt,
	)
	return i, err
}

const getReviewsByHServiceId = `-- name: GetReviewsByHServiceId :many
SELECT reviews.id, reviews.user_id, reviews.hservice_id, reviews.rating, reviews.comment, reviews.media, reviews.like_count, reviews.dislike_count, reviews.created_at, reviews.updated_at, users.id, users.email, users.username, users.full_name, users.password_hash, users.google_id, users.is_email_verified, users.is_active, users.role, users.password_reset_token, users.password_reset_expires, users.login_attempts, users.lockout_until, users.gender, users.profile_image, users.last_login, users.created_at, users.updated_at, hservices.id, hservices.user_id, hservices.title, hservices.slug, hservices.description, hservices.category, hservices.price, hservices.price_unit, hservices.price_timespan, hservices.is_online, hservices.url, hservices.location, hservices.delivery_time, hservices.delivery_timespan, hservices.total_points, hservices.total_votes, hservices.media, hservices.created_at, hservices.updated_at FROM reviews
LEFT JOIN users ON users.id = reviews.user_id
LEFT JOIN hservices ON hservices.id = reviews.hservice_id
WHERE reviews.hservice_id = $1
ORDER BY reviews.created_at DESC
OFFSET $2
LIMIT $3
`

type GetReviewsByHServiceIdParams struct {
	HserviceID string
	Offset     int32
	Limit      int32
}

type GetReviewsByHServiceIdRow struct {
	Review   Review
	User     User
	Hservice Hservice
}

func (q *Queries) GetReviewsByHServiceId(ctx context.Context, arg GetReviewsByHServiceIdParams) ([]GetReviewsByHServiceIdRow, error) {
	rows, err := q.db.Query(ctx, getReviewsByHServiceId, arg.HserviceID, arg.Offset, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetReviewsByHServiceIdRow
	for rows.Next() {
		var i GetReviewsByHServiceIdRow
		if err := rows.Scan(
			&i.Review.ID,
			&i.Review.UserID,
			&i.Review.HserviceID,
			&i.Review.Rating,
			&i.Review.Comment,
			&i.Review.Media,
			&i.Review.LikeCount,
			&i.Review.DislikeCount,
			&i.Review.CreatedAt,
			&i.Review.UpdatedAt,
			&i.User.ID,
			&i.User.Email,
			&i.User.Username,
			&i.User.FullName,
			&i.User.PasswordHash,
			&i.User.GoogleID,
			&i.User.IsEmailVerified,
			&i.User.IsActive,
			&i.User.Role,
			&i.User.PasswordResetToken,
			&i.User.PasswordResetExpires,
			&i.User.LoginAttempts,
			&i.User.LockoutUntil,
			&i.User.Gender,
			&i.User.ProfileImage,
			&i.User.LastLogin,
			&i.User.CreatedAt,
			&i.User.UpdatedAt,
			&i.Hservice.ID,
			&i.Hservice.UserID,
			&i.Hservice.Title,
			&i.Hservice.Slug,
			&i.Hservice.Description,
			&i.Hservice.Category,
			&i.Hservice.Price,
			&i.Hservice.PriceUnit,
			&i.Hservice.PriceTimespan,
			&i.Hservice.IsOnline,
			&i.Hservice.Url,
			&i.Hservice.Location,
			&i.Hservice.DeliveryTime,
			&i.Hservice.DeliveryTimespan,
			&i.Hservice.TotalPoints,
			&i.Hservice.TotalVotes,
			&i.Hservice.Media,
			&i.Hservice.CreatedAt,
			&i.Hservice.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getReviewsByUsername = `-- name: GetReviewsByUsername :many
SELECT reviews.id, reviews.user_id, reviews.hservice_id, reviews.rating, reviews.comment, reviews.media, reviews.like_count, reviews.dislike_count, reviews.created_at, reviews.updated_at, users.id, users.email, users.username, users.full_name, users.password_hash, users.google_id, users.is_email_verified, users.is_active, users.role, users.password_reset_token, users.password_reset_expires, users.login_attempts, users.lockout_until, users.gender, users.profile_image, users.last_login, users.created_at, users.updated_at, hservices.id, hservices.user_id, hservices.title, hservices.slug, hservices.description, hservices.category, hservices.price, hservices.price_unit, hservices.price_timespan, hservices.is_online, hservices.url, hservices.location, hservices.delivery_time, hservices.delivery_timespan, hservices.total_points, hservices.total_votes, hservices.media, hservices.created_at, hservices.updated_at FROM reviews
LEFT JOIN users ON users.id = reviews.user_id
LEFT JOIN hservices ON hservices.id = reviews.hservice_id
WHERE reviews.user_id = (SELECT id FROM users WHERE users.username = $1)
ORDER BY reviews.created_at DESC
OFFSET $2
LIMIT $3
`

type GetReviewsByUsernameParams struct {
	Username string
	Offset   int32
	Limit    int32
}

type GetReviewsByUsernameRow struct {
	Review   Review
	User     User
	Hservice Hservice
}

func (q *Queries) GetReviewsByUsername(ctx context.Context, arg GetReviewsByUsernameParams) ([]GetReviewsByUsernameRow, error) {
	rows, err := q.db.Query(ctx, getReviewsByUsername, arg.Username, arg.Offset, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetReviewsByUsernameRow
	for rows.Next() {
		var i GetReviewsByUsernameRow
		if err := rows.Scan(
			&i.Review.ID,
			&i.Review.UserID,
			&i.Review.HserviceID,
			&i.Review.Rating,
			&i.Review.Comment,
			&i.Review.Media,
			&i.Review.LikeCount,
			&i.Review.DislikeCount,
			&i.Review.CreatedAt,
			&i.Review.UpdatedAt,
			&i.User.ID,
			&i.User.Email,
			&i.User.Username,
			&i.User.FullName,
			&i.User.PasswordHash,
			&i.User.GoogleID,
			&i.User.IsEmailVerified,
			&i.User.IsActive,
			&i.User.Role,
			&i.User.PasswordResetToken,
			&i.User.PasswordResetExpires,
			&i.User.LoginAttempts,
			&i.User.LockoutUntil,
			&i.User.Gender,
			&i.User.ProfileImage,
			&i.User.LastLogin,
			&i.User.CreatedAt,
			&i.User.UpdatedAt,
			&i.Hservice.ID,
			&i.Hservice.UserID,
			&i.Hservice.Title,
			&i.Hservice.Slug,
			&i.Hservice.Description,
			&i.Hservice.Category,
			&i.Hservice.Price,
			&i.Hservice.PriceUnit,
			&i.Hservice.PriceTimespan,
			&i.Hservice.IsOnline,
			&i.Hservice.Url,
			&i.Hservice.Location,
			&i.Hservice.DeliveryTime,
			&i.Hservice.DeliveryTimespan,
			&i.Hservice.TotalPoints,
			&i.Hservice.TotalVotes,
			&i.Hservice.Media,
			&i.Hservice.CreatedAt,
			&i.Hservice.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}