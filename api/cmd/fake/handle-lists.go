package main

import (
	"context"
	"horizon/internal/db"

	"github.com/brianvoe/gofakeit/v7"
	"github.com/google/uuid"
	"github.com/pterm/pterm"
)

func handleLists(count int) error {
	ctx := context.Background()
	d := GetDb()

	userId, err := pterm.DefaultInteractiveTextInput.Show(
		"We need a user id. Enter a valid user ID that is in your database",
	)

	if err != nil {
		return err
	}

	logPerLoop := count / 10

	for i := 0; i < count; i++ {
		if i%logPerLoop == 0 {
			logger.Debug("Generating list", logger.Args("i", i))
		}

		_, err = d.Queries.CreateList(ctx, db.CreateListParams{
			ID:     uuid.New().String(),
			UserID: userId,
			Title:  gofakeit.Sentence(5),
		})

		if err != nil {
			return err
		}
	}

	return nil
}
