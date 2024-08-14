-- name: GetAuthByEmail :one
SELECT * FROM auth
WHERE email = $1 LIMIT 1;

-- name: GetAuthById :one
SELECT * FROM auth
WHERE id = $1 LIMIT 1;

-- name: GetAuthByGoogleId :one
SELECT * FROM auth
WHERE google_id = $1 LIMIT 1;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1 LIMIT 1;

-- name: CreateAuth :one
INSERT INTO auth (
  id,
  user_id,
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
  $5,
  $6,
  $7
)
RETURNING *;

-- name: CreateUser :one
INSERT INTO users (
  id,
  full_name,
  username,
  profile_image
) VALUES (
  $1,
  $2,
  $3,
  $4
)
RETURNING *;