package main

import (
	"context"
	"horizon/internal/db"
	"strings"

	"github.com/google/uuid"
	"github.com/pterm/pterm"
)

func handleListItems(count int) error {
	ctx := context.Background()
	d := GetDb()

	userId, err := pterm.DefaultInteractiveTextInput.Show(
		"We need a user id. Enter a valid user ID that is in your database",
	)

	if err != nil {
		return err
	}

	listId, err := pterm.DefaultInteractiveTextInput.Show(
		"We need a list id. Enter a valid list ID that is in your database",
	)

	if err != nil {
		return err
	}

	logger.Debug("Getting N random hservices from the database", logger.Args("n", count))
	rndHServiceIds, err := d.Queries.GetRandomHServices(ctx, int32(count))

	if err != nil {
		return err
	}

	logPerLoop := count / 10
	failCount := 0

	for i, v := range rndHServiceIds {
		if i%logPerLoop == 0 {
			logger.Debug("Generating list item", logger.Args("i", i, "userId", userId, "hservice id", v))
		}

		_, err = d.Queries.CreateListItem(ctx, db.CreateListItemParams{
			ID:         uuid.New().String(),
			ListID:     listId,
			HserviceID: v,
			ItemOrder:  int32(i),
		})

		if err != nil {
			// check if the error is duplicate key value violates unique constraint
			pgErrCode := "SQLSTATE 23505"
			if strings.Contains(err.Error(), pgErrCode) {
				failCount++
			} else {
				// something else happened. Abort.
				return err
			}
		}
	}

	logger.Info("Loop ended. Count of unique index violation errors:", logger.Args("count", failCount))

	return nil
}
