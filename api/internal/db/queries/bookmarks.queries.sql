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
