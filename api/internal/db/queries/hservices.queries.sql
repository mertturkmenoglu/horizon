-- name: CreateHService :one
INSERT INTO hservices (
  id,
  user_id,
  title,
  slug,
  description,
  category,
  price,
  price_unit,
  price_timespan,
  is_online,
  url,
  location,
  delivery_time,
  delivery_timespan,
  total_points,
  total_votes,
  media,
  created_at,
  updated_at
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8,
  $9,
  $10,
  $11,
  $12,
  $13,
  $14,
  $15,
  $16,
  $17,
  $18,
  $19
)
RETURNING *;

-- name: GetMyHServices :many
SELECT * FROM hservices
WHERE user_id = $1
ORDER BY created_at DESC
OFFSET $2
LIMIT $3;

-- name: CountMyHServices :one
SELECT COUNT(*) FROM hservices
WHERE user_id = $1;

-- name: GetHServiceById :one
SELECT sqlc.embed(hservices), sqlc.embed(users) FROM hservices
JOIN users ON users.id = hservices.user_id
WHERE hservices.id = $1
LIMIT 1;

-- name: CountAllHServices :one
SELECT COUNT(*) FROM hservices;

-- name: ListHServices :many
SELECT sqlc.embed(hservices), sqlc.embed(users) FROM hservices
JOIN users ON users.id = hservices.user_id
ORDER BY hservices.created_at ASC
OFFSET $1
LIMIT $2;

-- name: GetFavoriteHServices :many
SELECT sqlc.embed(hservices), sqlc.embed(users) FROM hservices
JOIN users ON users.id = hservices.user_id
ORDER BY total_points DESC -- TODO: Replace with total_favorites later
LIMIT 25;

-- name: GetFeaturedHServices :many
SELECT sqlc.embed(hservices), sqlc.embed(users) FROM hservices
JOIN users ON users.id = hservices.user_id
WHERE total_votes != 0
ORDER BY total_points / total_votes DESC, total_votes DESC
LIMIT 25;

-- name: GetPopularHServices :many
SELECT sqlc.embed(hservices), sqlc.embed(users) FROM hservices
JOIN users ON users.id = hservices.user_id
ORDER BY total_votes DESC
LIMIT 25;

-- name: GetNewHServices :many
SELECT sqlc.embed(hservices), sqlc.embed(users) FROM hservices
JOIN users ON users.id = hservices.user_id
ORDER BY hservices.created_at DESC
LIMIT 25;

-- name: GetHServicesByUsername :many
SELECT sqlc.embed(hservices), sqlc.embed(users) FROM hservices
JOIN users ON users.id = hservices.user_id
WHERE hservices.user_id = (SELECT id FROM users WHERE users.username = $1 LIMIT 1)
ORDER BY hservices.created_at DESC
OFFSET $2
LIMIT $3;

-- name: CountHServicesByUsername :one
SELECT COUNT(*) FROM hservices
WHERE user_id = (SELECT id FROM users WHERE users.username = $1 LIMIT 1);

-- name: GetRandomHServices :many
SELECT id FROM hservices
ORDER BY RANDOM()
LIMIT $1;
