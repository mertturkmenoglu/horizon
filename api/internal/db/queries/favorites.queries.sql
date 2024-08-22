-- name: CreateFavorite :one
INSERT INTO favorites (
  user_id,
  hservice_id
) VALUES (
  $1,
  $2
)
RETURNING *;

-- name: DeleteFavoriteByHServiceId :exec
DELETE FROM favorites
WHERE hservice_id = $1 AND user_id = $2;

-- name: GetFavoritesByUserId :many
SELECT sqlc.embed(favorites), sqlc.embed(hservices) FROM favorites
JOIN hservices ON hservices.id = favorites.hservice_id
WHERE favorites.user_id = $1
ORDER BY favorites.created_at DESC
OFFSET $2
LIMIT $3;

-- name: CountUserFavorites :one
SELECT COUNT(*) FROM favorites
WHERE user_id = $1;

-- name: GetFavoriteById :one
SELECT sqlc.embed(favorites), sqlc.embed(hservices) FROM favorites
JOIN hservices ON hservices.id = favorites.hservice_id
WHERE favorites.id = $1;

-- name: IsFavorite :one
SELECT id FROM favorites
WHERE hservice_id = $1 AND user_id = $2;

-- name: GetFavoritesByUsername :many
SELECT sqlc.embed(favorites), sqlc.embed(hservices) FROM favorites
JOIN hservices ON hservices.id = favorites.hservice_id
WHERE favorites.user_id = (SELECT id FROM users WHERE users.username = $1)
ORDER BY favorites.created_at DESC
OFFSET $2
LIMIT $3;

-- name: CountUserFavoritesByUsername :one
SELECT COUNT(*) FROM favorites
WHERE user_id = (SELECT id FROM users WHERE username = $1);
