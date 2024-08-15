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
