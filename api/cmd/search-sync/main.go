package main

import (
	"context"
	"encoding/json"
	"errors"
	"horizon/config"
	"horizon/internal/db"
	"horizon/internal/search"
	"math"
	"time"

	"github.com/pterm/pterm"
)

var logger = pterm.DefaultLogger.WithLevel(pterm.LogLevelTrace)
var database *db.Db

func GetDb() *db.Db {
	if database == nil {
		database = db.NewDb()
	}
	return database
}

func main() {
	config.Bootstrap()

	startTime := time.Now()
	logger.Debug("Starting Typesense data synchronization", logger.Args("startTime", startTime))
	var opts = []string{"hservice"}

	resType, _ := pterm.DefaultInteractiveSelect.WithOptions(opts).Show("Select a resource to sync")

	err := startSync(resType)

	if err != nil {
		logger.Fatal("An error happened", logger.Args("error", err))
		return
	}

	endTime := time.Now()
	duration := endTime.Sub(startTime).Milliseconds()
	logger.Info("Synchronization completed successfully.", logger.Args("endTime", endTime, "duration", duration))
}

func startSync(resType string) error {
	if resType == "hservice" {
		return syncHServices()
	} else {
		return errors.New("unknown resource type " + resType)
	}
}

func syncHServices() error {
	s := search.New()
	d := GetDb()
	count, err := d.Queries.CountAllHServices(context.Background())

	if err != nil {
		return err
	}

	// Calculate how many record we are going to fetch each time we hit the database
	// I don't know what this value should be so I come up with this:
	// - n is the total count
	// - take sqrt of n
	// - take sqrt of that value
	// - floor the value
	// If there are 100 records, step will be 3
	// If there are 1_000_000 records, step will be 31
	step := math.Floor(math.Sqrt(math.Sqrt(float64(count))))

	logger.Debug("Starting hservices sync with these values:", logger.Args("count", count, "step", step))

	offset := 0
	i := 0

	for int64(offset) < count {
		logger.Debug("Fetching hservices from the database.", logger.Args("offset", offset))

		res, err := d.Queries.ListHServices(context.Background(), db.ListHServicesParams{
			Offset: int32(offset),
			Limit:  int32(step),
		})

		if err != nil {
			return err
		}

		for _, v := range res {
			logger.Debug("Upserting hservice", logger.Args("i", i+1))

			var url *string = nil

			if v.Hservice.Url.Valid {
				url = &v.Hservice.Url.String
			}

			var media map[string]any

			err := json.Unmarshal(v.Hservice.Media, &media)

			if err != nil {
				return err
			}

			var gender *string = nil

			if v.User.Gender.Valid {
				gender = &v.User.Gender.String
			}

			var profileImage *string = nil

			if v.User.ProfileImage.Valid {
				profileImage = &v.User.ProfileImage.String
			}

			_, err = s.UpsertHService(search.UpsertHServiceDto{
				ID:     v.Hservice.ID,
				UserID: v.Hservice.UserID,
				User: search.UserDto{
					ID:           v.User.ID,
					Username:     v.User.Username,
					FullName:     v.User.FullName,
					Gender:       gender,
					ProfileImage: profileImage,
					CreatedAt:    v.User.CreatedAt.Time,
				},
				Title:            v.Hservice.Title,
				Slug:             v.Hservice.Slug,
				Description:      v.Hservice.Description,
				Category:         v.Hservice.Category,
				Price:            v.Hservice.Price,
				PriceUnit:        string(v.Hservice.PriceUnit),
				PriceTimespan:    string(v.Hservice.PriceTimespan),
				IsOnline:         v.Hservice.IsOnline,
				Url:              url,
				Location:         v.Hservice.Location,
				DeliveryTime:     v.Hservice.DeliveryTime,
				DeliveryTimespan: string(v.Hservice.DeliveryTimespan),
				TotalPoints:      v.Hservice.TotalPoints,
				TotalVotes:       v.Hservice.TotalVotes,
				Media:            media,
				CreatedAt:        v.Hservice.CreatedAt.Time,
				UpdatedAt:        v.Hservice.UpdatedAt.Time,
			})

			if err != nil {
				return err
			}

			i++
		}

		offset += int(step)
	}

	return nil
}
