-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1 LIMIT 1;

-- name: GetUserById :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: GetUserByGoogleId :one
SELECT * FROM users
WHERE google_id = $1 LIMIT 1;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1 LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (
  id,
  email,
  username,
  full_name,
  password_hash,
  google_id,
  is_email_verified,
  profile_image
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8
)
RETURNING *;

-- name: UpdateUserGoogleId :exec
UPDATE users
  SET google_id = $2
WHERE id = $1;

-- name: GetMe :one
SELECT 
  id,
  email,
  username,
  full_name,
  google_id, 
  is_email_verified, 
  is_active, 
  role, 
  gender,
  profile_image,
  last_login, 
  created_at, 
  updated_at 
FROM users
WHERE id = $1 LIMIT 1;

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

-- name: CreateCountry :one
INSERT INTO countries (
  id,
  name,
  iso2,
  numeric_code,
  phone_code,
  capital,
  currency,
  currency_name,
  currency_symbol,
  tld,
  native,
  region,
  subregion,
  timezones,
  latitude,
  longitude
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
  $16
)
RETURNING *;

-- name: CreateState :one
INSERT INTO states (
  id,
  name,
  country_id,
  country_code,
  country_name,
  state_code,
  type,
  latitude,
  longitude
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8,
  $9
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

-- name: GetUserProfileByUsername :one
SELECT
  id,
  username,
  full_name,
  gender,
  profile_image,
  created_at
FROM users
WHERE username = $1
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

-- name: CreateBookmark :one
INSERT INTO bookmarks (
  user_id,
  hservice_id
) VALUES (
  $1,
  $2
)
RETURNING *;

-- name: DeleteBookmarkByHServiceId :exec
DELETE FROM bookmarks
WHERE hservice_id = $1 AND user_id = $2;

-- name: GetBookmarksByUserId :many
SELECT sqlc.embed(bookmarks), sqlc.embed(hservices) FROM bookmarks
JOIN hservices ON hservices.id = bookmarks.hservice_id
WHERE bookmarks.user_id = $1
ORDER BY bookmarks.created_at DESC
OFFSET $2
LIMIT $3;

-- name: CountUserBookmarks :one
SELECT COUNT(*) FROM bookmarks
WHERE user_id = $1;

-- name: GetBookmarkById :one
SELECT sqlc.embed(bookmarks), sqlc.embed(hservices) FROM bookmarks
JOIN hservices ON hservices.id = bookmarks.hservice_id
WHERE bookmarks.id = $1;

-- name: IsBookmarked :one
SELECT id FROM bookmarks
WHERE hservice_id = $1 AND user_id = $2;

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

-- name: GetMyLists :many
SELECT * FROM lists
WHERE user_id = $1;

-- name: GetUsersLists :many
SELECT sqlc.embed(lists), sqlc.embed(users) FROM lists
JOIN users ON users.id = lists.user_id
WHERE lists.user_id = $1
ORDER BY lists.created_at DESC;

-- name: GetListItemsInfo :many
SELECT * FROM list_items
WHERE hservice_id = $1 AND list_id IN (SELECT id FROM lists WHERE user_id = $2);

-- name: GetListById :one
SELECT sqlc.embed(lists), sqlc.embed(users) FROM lists
JOIN users ON users.id = lists.user_id
WHERE lists.id = $1;

-- name: GetListItemsByListId :many
SELECT sqlc.embed(list_items), sqlc.embed(hservices), sqlc.embed(hservice_users) FROM list_items
LEFT JOIN hservices ON hservices.id = list_items.hservice_id
LEFT JOIN users AS hservice_users ON hservice_users.id = hservices.user_id
WHERE list_items.list_id = $1;

-- name: CreateList :one
INSERT INTO lists (
  id,
  title,
  user_id
) VALUES (
  $1,
  $2,
  $3
)
RETURNING *;

-- name: CreateListItem :one
INSERT INTO list_items (
  id,
  list_id,
  hservice_id,
  item_order
) VALUES (
  $1,
  $2,
  $3,
  $4
)
RETURNING *;

-- name: DeleteListById :exec
DELETE FROM lists
WHERE id = $1 AND user_id = $2;

-- name: DeleteListItemById :exec
DELETE FROM list_items
WHERE list_items.id = $1 AND list_id IN (SELECT lists.id FROM lists WHERE user_id = $2);

-- name: GetUserListCount :one
SELECT COUNT(*) FROM lists
WHERE user_id = $1;

-- name: GetListItemCount :one
SELECT COUNT(*) FROM list_items
WHERE list_id = $1;
