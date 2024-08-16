package main

import (
	"context"
	"encoding/json"
	"fmt"
	"horizon/config"
	"horizon/internal/api/hservices"
	"horizon/internal/db"
	"horizon/internal/hash"
	"log"
	"slices"
	"strconv"
	"time"

	"github.com/brianvoe/gofakeit/v7"
	"github.com/gosimple/slug"
	"github.com/jackc/pgx/v5/pgtype"
)

var database *db.Db

func GetDb() *db.Db {
	if database == nil {
		database = db.NewDb()
	}
	return database
}

func main() {
	config.Bootstrap()

	validGenTypes := []string{"user", "hservice"}
	fmt.Println("> What do you want to generate?", validGenTypes)

	var genType string
	fmt.Scanln(&genType)

	if !slices.Contains(validGenTypes, genType) {
		log.Fatal("Invalid generation type. Terminating.")
	}

	fmt.Println("> How many do you want to generate? (Between 1 and 10 000)")
	var sCount string
	fmt.Scanln(&sCount)
	count, err := strconv.ParseInt(sCount, 10, 32)

	if err != nil || count < 1 || count > 10_000 {
		log.Fatal("Invalid count. Terminating.")
	}

	fmt.Printf("Generating %d number of %s data\n", count, genType)
	err = generateAndInsert(genType, int(count))

	if err != nil {
		log.Fatal("Encountered error. Terminating.", err.Error())
	}

	fmt.Println("Completed")
}

func generateAndInsert(genType string, count int) error {
	switch genType {
	case "user":
		return handleUser(count)
	case "hservice":
		return handleHService(count)
	default:
		log.Fatal("Invalid generation type. Terminating.")
		return nil
	}
}

func handleUser(count int) error {
	ctx := context.Background()
	d := GetDb()

	for i := 0; i < count; i++ {
		log.Println("Generating user", i+1)
		h, err := hash.Hash("LoremIpsum!1")

		if err != nil {
			return err
		}

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

func handleHService(count int) error {
	ctx := context.Background()
	d := GetDb()

	fmt.Println("> We need a user id. Enter a valid user ID that is in your database: ")
	var userId string
	fmt.Scanln(&userId)

	for i := 0; i < count; i++ {
		log.Println("Generating hservice", i+1)

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

		mediaBytes, err := json.Marshal(allMedia)

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

var imageUrls = []string{
	"https://imgur.com/5F9jdqG",
	"https://imgur.com/PLOjI55",
	"https://imgur.com/JYnxkQM",
	"https://imgur.com/Y3ujIqE",
	"https://imgur.com/7oSGh9R",
	"https://imgur.com/Q4xKlfx",
	"https://imgur.com/8VXj0Pt",
	"https://imgur.com/pb24GMQ",
	"https://imgur.com/nOtUKhM",
	"https://imgur.com/f6VKpRj",
	"https://imgur.com/EwvUEmR",
	"https://imgur.com/DOgJY3o",
	"https://imgur.com/mrAicIB",
	"https://imgur.com/wGD07jx",
	"https://imgur.com/1mn0i08",
	"https://imgur.com/sc4r21z",
	"https://imgur.com/0fsRZC9",
	"https://imgur.com/Ivsxi5b",
	"https://imgur.com/opsngDD",
	"https://imgur.com/FKlIkC5",
	"https://imgur.com/2XI5t0u",
	"https://imgur.com/XFG5Q7R",
	"https://imgur.com/H6F5qND",
	"https://imgur.com/OlOa85q",
	"https://imgur.com/nX7JSRq",
	"https://imgur.com/Bpj7Rlw",
	"https://imgur.com/0hYMpwI",
	"https://imgur.com/CNtFbZT",
	"https://imgur.com/SnP70MO",
	"https://imgur.com/mWzmPRv",
}

func GetRandomImageUrl() string {
	return fmt.Sprintf("https://loremflickr.com/960/720?lock=%d", gofakeit.IntRange(1, 1000))
}
