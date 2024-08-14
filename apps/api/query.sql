-- name: GetAuthor :one
SELECT * FROM authors
WHERE id = $1 LIMIT 1;

-- name: ListAuthors :many
SELECT * FROM authors
ORDER BY name;

-- name: CreateAuthor :one
INSERT INTO authors (
  name, bio
) VALUES (
  $1, $2
)
RETURNING *;

-- name: UpdateAuthor :one
UPDATE authors
  set name = $2,
  bio = $3
WHERE id = $1
RETURNING *;

-- name: DeleteAuthor :exec
DELETE FROM authors
WHERE id = $1;

-- name: GetAuthByEmail :one
SELECT * FROM auth
WHERE email = $1 LIMIT 1;

-- name: GetAuthByGoogleId :one
SELECT * FROM auth
WHERE google_id = $1 LIMIT 1;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1 LIMIT 1;

-- name: CreateAuth :one
INSERT INTO auth (
  email,
  password_hash,
  google_id,
  is_email_verified,
  role
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5
)
RETURNING *;

-- name: CreateUser :one
INSERT INTO users (
  full_name,
  username,
  profile_image
) VALUES (
  $1,
  $2,
  $3
)
RETURNING *;