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
