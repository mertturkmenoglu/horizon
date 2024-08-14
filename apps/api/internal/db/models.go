// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type User struct {
	ID                   string
	Email                string
	Username             string
	FullName             string
	PasswordHash         pgtype.Text
	GoogleID             pgtype.Text
	IsEmailVerified      bool
	IsActive             bool
	Role                 string
	PasswordResetToken   pgtype.Text
	PasswordResetExpires pgtype.Timestamptz
	LoginAttempts        pgtype.Int4
	LockoutUntil         pgtype.Timestamptz
	Gender               pgtype.Text
	ProfileImage         pgtype.Text
	LastLogin            pgtype.Timestamptz
	CreatedAt            pgtype.Timestamptz
	UpdatedAt            pgtype.Timestamptz
}
