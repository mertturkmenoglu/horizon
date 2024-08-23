
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

-- name: GetListItemById :one
SELECT id, list_id, item_order FROM list_items
WHERE id = $1 AND list_id = $2;

-- name: UpdateListItemOrderWithIndexRangeDecr :exec
UPDATE list_items
SET item_order = item_order - 1
WHERE
  list_id = $1 AND
  item_order > $2 AND
  item_order <= $3;

-- name: UpdateListItemOrder :exec
UPDATE list_items
SET item_order = $2
WHERE id = $1;

-- name: UpdateListItemOrderWithIndexRangeIncr :exec
UPDATE list_items
SET item_order = item_order + 1
WHERE
  list_id = $1 AND
  item_order >= $2 AND
  item_order <= $3;
