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

-- name: UpdateUserIsEmailVerified :exec
UPDATE users
  SET is_email_verified = true
WHERE id = $1;

-- name: UpdateUserPassword :exec
UPDATE users
  SET password_hash = $2
WHERE id = $1;
