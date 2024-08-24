-- name: GetReviewById :one
SELECT sqlc.embed(reviews), sqlc.embed(users), sqlc.embed(hservices) FROM reviews
LEFT JOIN users ON users.id = reviews.user_id
LEFT JOIN hservices ON hservices.id = reviews.hservice_id
WHERE reviews.id = $1
LIMIT 1;

-- name: GetReviewsByHServiceId :many
SELECT sqlc.embed(reviews), sqlc.embed(users), sqlc.embed(hservices) FROM reviews
LEFT JOIN users ON users.id = reviews.user_id
LEFT JOIN hservices ON hservices.id = reviews.hservice_id
WHERE reviews.hservice_id = $1
ORDER BY reviews.created_at DESC
OFFSET $2
LIMIT $3;

-- name: GetReviewsByUsername :many
SELECT sqlc.embed(reviews), sqlc.embed(users), sqlc.embed(hservices) FROM reviews
LEFT JOIN users ON users.id = reviews.user_id
LEFT JOIN hservices ON hservices.id = reviews.hservice_id
WHERE reviews.user_id = (SELECT id FROM users WHERE users.username = $1)
ORDER BY reviews.created_at DESC
OFFSET $2
LIMIT $3;

-- name: DeleteReviewById :exec
DELETE FROM reviews
WHERE id = $1 AND user_id = $2;

-- name: CreateReviewVote :one
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
RETURNING *;

-- name: DeleteReviewVoteById :exec
DELETE FROM reviews_votes
WHERE id = $1 AND user_id = $2;

-- name: CountReviewsByHServiceId :one
SELECT COUNT(*) FROM reviews
WHERE hservice_id = $1;

-- name: CountReviewsByUsername :one
SELECT COUNT(*) FROM reviews
WHERE user_id = (SELECT id FROM users WHERE username = $1);
