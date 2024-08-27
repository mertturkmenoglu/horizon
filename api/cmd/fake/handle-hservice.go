package main

import (
	"context"
	"encoding/json"
	"horizon/internal/api/hservices"
	"horizon/internal/db"
	"time"

	"github.com/brianvoe/gofakeit/v7"
	"github.com/gosimple/slug"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/pterm/pterm"
)

func handleHService(count int) error {
	ctx := context.Background()
	d := GetDb()

	userId, err := pterm.DefaultInteractiveTextInput.Show(
		"We need a user id. Enter a valid user ID that is in your database",
	)

	if err != nil {
		return err
	}

	for i := 0; i < count; i++ {
		logger.Debug("Generating hservice", logger.Args("i", i))

		title := gofakeit.ProductName()
		slugVal := slug.Make(title)
		totalVotes := gofakeit.IntRange(5, 1000)
		totalPoints := gofakeit.IntRange(totalVotes, totalVotes*5)
		mediaCount := gofakeit.IntRange(3, 10)
		allMedia := make([]any, 0)

		for j := 0; j < mediaCount; j++ {
			media := map[string]any{
				"type":      "image",
				"url":       GetRandomImageUrl(),
				"thumbnail": GetRandomImageUrl(),
				"alt":       gofakeit.Sentence(3),
				"caption":   gofakeit.Sentence(5),
				"width":     gofakeit.IntRange(100, 1920),
				"height":    gofakeit.IntRange(100, 1080),
			}

			allMedia = append(allMedia, media)
		}

		mediaData := map[string]any{
			"data": allMedia,
		}

		mediaBytes, err := json.Marshal(mediaData)

		if err != nil {
			return err
		}

		_, err = d.Queries.CreateHService(ctx, db.CreateHServiceParams{
			ID:               gofakeit.UUID(),
			UserID:           userId,
			Title:            title,
			Slug:             slugVal,
			Description:      gofakeit.ProductDescription(),
			Category:         int32(gofakeit.IntRange(1, 32)),
			Price:            gofakeit.Price(1, 10000),
			PriceUnit:        db.Priceunit(gofakeit.RandomString(hservices.ValidPriceUnits)),
			PriceTimespan:    db.Worktimespan(gofakeit.RandomString(hservices.ValidTimespans)),
			IsOnline:         gofakeit.Bool(),
			Url:              pgtype.Text{String: gofakeit.URL(), Valid: true},
			Location:         gofakeit.Address().Address,
			DeliveryTime:     int32(gofakeit.IntRange(1, 32)),
			DeliveryTimespan: db.Worktimespan(gofakeit.RandomString(hservices.ValidTimespans)),
			TotalVotes:       int32(totalVotes),
			TotalPoints:      int64(totalPoints),
			CreatedAt:        pgtype.Timestamptz{Time: time.Now(), Valid: true},
			UpdatedAt:        pgtype.Timestamptz{Time: time.Now(), Valid: true},
			Media:            mediaBytes,
		})

		if err != nil {
			return err
		}
	}

	return nil
}
