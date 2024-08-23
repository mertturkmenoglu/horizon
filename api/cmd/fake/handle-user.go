package main

import (
	"context"
	"horizon/internal/db"
	"horizon/internal/hash"

	"github.com/brianvoe/gofakeit/v7"
	"github.com/jackc/pgx/v5/pgtype"
)

func handleUser(count int) error {
	ctx := context.Background()
	d := GetDb()
	h, err := hash.Hash("LoremIpsum!1")

	if err != nil {
		return err
	}

	for i := 0; i < count; i++ {
		logger.Debug("Generating user", logger.Args("i", i))

		_, err = d.Queries.CreateUser(ctx, db.CreateUserParams{
			ID:              gofakeit.UUID(),
			Email:           gofakeit.Email(),
			Username:        gofakeit.Username(),
			FullName:        gofakeit.Name(),
			PasswordHash:    pgtype.Text{String: h, Valid: true},
			GoogleID:        pgtype.Text{Valid: false},
			IsEmailVerified: gofakeit.Bool(),
			ProfileImage:    pgtype.Text{String: gofakeit.RandomString(imageUrls), Valid: true},
		})

		if err != nil {
			return err
		}
	}

	return nil
}
