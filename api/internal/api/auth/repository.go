package auth

import (
	"context"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/hash"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func (r *repository) getUserByGoogleId(id string) (db.User, error) {
	return r.db.Queries.GetUserByGoogleId(
		context.Background(),
		pgtype.Text{String: id, Valid: true},
	)
}

func (r *repository) getUserByEmail(email string) (db.User, error) {
	return r.db.Queries.GetUserByEmail(
		context.Background(),
		email,
	)
}

func (r *repository) updateUserGoogleId(id string, googleId string) error {
	return r.db.Queries.UpdateUserGoogleId(
		context.Background(),
		db.UpdateUserGoogleIdParams{
			ID:       id,
			GoogleID: pgtype.Text{String: googleId, Valid: true},
		},
	)
}

func (r *repository) createUser(googleUser *googleUser) (string, error) {
	username, err := generateUsernameFromEmail(r.db, googleUser.Email)

	if err != nil {
		return "", err
	}

	saved, err := r.db.Queries.CreateUser(context.Background(), db.CreateUserParams{
		ID:              h.GenerateId(r.flake),
		Email:           googleUser.Email,
		Username:        username,
		FullName:        googleUser.Name,
		PasswordHash:    pgtype.Text{},
		GoogleID:        pgtype.Text{String: googleUser.Id, Valid: true},
		IsEmailVerified: true,
		ProfileImage:    pgtype.Text{String: googleUser.Picture, Valid: true},
	})

	if err != nil {
		return "", err
	}

	return saved.ID, nil
}

func (r *repository) createSession(sessionId string, userId string) error {
	createdAt := time.Now()
	expiresAt := createdAt.Add(time.Hour * 24 * 7)

	_, err := r.db.Queries.CreateSession(
		context.Background(),
		db.CreateSessionParams{
			ID:          sessionId,
			UserID:      userId,
			SessionData: pgtype.Text{},
			CreatedAt:   pgtype.Timestamptz{Time: createdAt, Valid: true},
			ExpiresAt:   pgtype.Timestamptz{Time: expiresAt, Valid: true},
		},
	)

	return err
}

func (r *repository) getUserByUsername(username string) (db.User, error) {
	return r.db.Queries.GetUserByUsername(
		context.Background(),
		username,
	)
}

func (r *repository) createUserFromCredentialsInfo(dto RegisterRequestDto) (*db.User, error) {
	// Hash password
	hashed, err := hash.Hash(dto.Password)

	if err != nil {
		return nil, errHash
	}

	saved, err := r.db.Queries.CreateUser(context.Background(), db.CreateUserParams{
		ID:              h.GenerateId(r.flake),
		Email:           dto.Email,
		Username:        dto.Username,
		FullName:        dto.FullName,
		PasswordHash:    pgtype.Text{String: hashed, Valid: true},
		GoogleID:        pgtype.Text{},
		IsEmailVerified: false,
		ProfileImage:    pgtype.Text{},
	})

	return &saved, err
}

func (r *repository) verifyUserEmail(userId string) error {
	return r.db.Queries.UpdateUserIsEmailVerified(
		context.Background(),
		userId,
	)
}

func (r *repository) updateUserPassword(userId string, hashed string) error {
	return r.db.Queries.UpdateUserPassword(
		context.Background(),
		db.UpdateUserPasswordParams{
			ID:           userId,
			PasswordHash: pgtype.Text{String: hashed, Valid: true},
		},
	)
}
