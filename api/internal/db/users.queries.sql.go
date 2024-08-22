// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: users.queries.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :one
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
RETURNING id, email, username, full_name, password_hash, google_id, is_email_verified, is_active, role, password_reset_token, password_reset_expires, login_attempts, lockout_until, gender, profile_image, last_login, created_at, updated_at
`

type CreateUserParams struct {
	ID              string
	Email           string
	Username        string
	FullName        string
	PasswordHash    pgtype.Text
	GoogleID        pgtype.Text
	IsEmailVerified bool
	ProfileImage    pgtype.Text
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, createUser,
		arg.ID,
		arg.Email,
		arg.Username,
		arg.FullName,
		arg.PasswordHash,
		arg.GoogleID,
		arg.IsEmailVerified,
		arg.ProfileImage,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Username,
		&i.FullName,
		&i.PasswordHash,
		&i.GoogleID,
		&i.IsEmailVerified,
		&i.IsActive,
		&i.Role,
		&i.PasswordResetToken,
		&i.PasswordResetExpires,
		&i.LoginAttempts,
		&i.LockoutUntil,
		&i.Gender,
		&i.ProfileImage,
		&i.LastLogin,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getMe = `-- name: GetMe :one
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
WHERE id = $1 LIMIT 1
`

type GetMeRow struct {
	ID              string
	Email           string
	Username        string
	FullName        string
	GoogleID        pgtype.Text
	IsEmailVerified bool
	IsActive        bool
	Role            string
	Gender          pgtype.Text
	ProfileImage    pgtype.Text
	LastLogin       pgtype.Timestamptz
	CreatedAt       pgtype.Timestamptz
	UpdatedAt       pgtype.Timestamptz
}

func (q *Queries) GetMe(ctx context.Context, id string) (GetMeRow, error) {
	row := q.db.QueryRow(ctx, getMe, id)
	var i GetMeRow
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Username,
		&i.FullName,
		&i.GoogleID,
		&i.IsEmailVerified,
		&i.IsActive,
		&i.Role,
		&i.Gender,
		&i.ProfileImage,
		&i.LastLogin,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, email, username, full_name, password_hash, google_id, is_email_verified, is_active, role, password_reset_token, password_reset_expires, login_attempts, lockout_until, gender, profile_image, last_login, created_at, updated_at FROM users
WHERE email = $1 LIMIT 1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRow(ctx, getUserByEmail, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Username,
		&i.FullName,
		&i.PasswordHash,
		&i.GoogleID,
		&i.IsEmailVerified,
		&i.IsActive,
		&i.Role,
		&i.PasswordResetToken,
		&i.PasswordResetExpires,
		&i.LoginAttempts,
		&i.LockoutUntil,
		&i.Gender,
		&i.ProfileImage,
		&i.LastLogin,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getUserByGoogleId = `-- name: GetUserByGoogleId :one
SELECT id, email, username, full_name, password_hash, google_id, is_email_verified, is_active, role, password_reset_token, password_reset_expires, login_attempts, lockout_until, gender, profile_image, last_login, created_at, updated_at FROM users
WHERE google_id = $1 LIMIT 1
`

func (q *Queries) GetUserByGoogleId(ctx context.Context, googleID pgtype.Text) (User, error) {
	row := q.db.QueryRow(ctx, getUserByGoogleId, googleID)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Username,
		&i.FullName,
		&i.PasswordHash,
		&i.GoogleID,
		&i.IsEmailVerified,
		&i.IsActive,
		&i.Role,
		&i.PasswordResetToken,
		&i.PasswordResetExpires,
		&i.LoginAttempts,
		&i.LockoutUntil,
		&i.Gender,
		&i.ProfileImage,
		&i.LastLogin,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT id, email, username, full_name, password_hash, google_id, is_email_verified, is_active, role, password_reset_token, password_reset_expires, login_attempts, lockout_until, gender, profile_image, last_login, created_at, updated_at FROM users
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetUserById(ctx context.Context, id string) (User, error) {
	row := q.db.QueryRow(ctx, getUserById, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Username,
		&i.FullName,
		&i.PasswordHash,
		&i.GoogleID,
		&i.IsEmailVerified,
		&i.IsActive,
		&i.Role,
		&i.PasswordResetToken,
		&i.PasswordResetExpires,
		&i.LoginAttempts,
		&i.LockoutUntil,
		&i.Gender,
		&i.ProfileImage,
		&i.LastLogin,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getUserByUsername = `-- name: GetUserByUsername :one
SELECT id, email, username, full_name, password_hash, google_id, is_email_verified, is_active, role, password_reset_token, password_reset_expires, login_attempts, lockout_until, gender, profile_image, last_login, created_at, updated_at FROM users
WHERE username = $1 LIMIT 1
`

func (q *Queries) GetUserByUsername(ctx context.Context, username string) (User, error) {
	row := q.db.QueryRow(ctx, getUserByUsername, username)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Username,
		&i.FullName,
		&i.PasswordHash,
		&i.GoogleID,
		&i.IsEmailVerified,
		&i.IsActive,
		&i.Role,
		&i.PasswordResetToken,
		&i.PasswordResetExpires,
		&i.LoginAttempts,
		&i.LockoutUntil,
		&i.Gender,
		&i.ProfileImage,
		&i.LastLogin,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getUserProfileByUsername = `-- name: GetUserProfileByUsername :one
SELECT
  id,
  username,
  full_name,
  gender,
  profile_image,
  created_at
FROM users
WHERE username = $1
LIMIT 1
`

type GetUserProfileByUsernameRow struct {
	ID           string
	Username     string
	FullName     string
	Gender       pgtype.Text
	ProfileImage pgtype.Text
	CreatedAt    pgtype.Timestamptz
}

func (q *Queries) GetUserProfileByUsername(ctx context.Context, username string) (GetUserProfileByUsernameRow, error) {
	row := q.db.QueryRow(ctx, getUserProfileByUsername, username)
	var i GetUserProfileByUsernameRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.FullName,
		&i.Gender,
		&i.ProfileImage,
		&i.CreatedAt,
	)
	return i, err
}

const updateUserGoogleId = `-- name: UpdateUserGoogleId :exec
UPDATE users
  SET google_id = $2
WHERE id = $1
`

type UpdateUserGoogleIdParams struct {
	ID       string
	GoogleID pgtype.Text
}

func (q *Queries) UpdateUserGoogleId(ctx context.Context, arg UpdateUserGoogleIdParams) error {
	_, err := q.db.Exec(ctx, updateUserGoogleId, arg.ID, arg.GoogleID)
	return err
}

const updateUserIsEmailVerified = `-- name: UpdateUserIsEmailVerified :exec
UPDATE users
  SET is_email_verified = true
WHERE id = $1
`

func (q *Queries) UpdateUserIsEmailVerified(ctx context.Context, id string) error {
	_, err := q.db.Exec(ctx, updateUserIsEmailVerified, id)
	return err
}
