package main

import (
	"fmt"
	"horizon/config"
	"horizon/internal/db"
	"strconv"

	"github.com/brianvoe/gofakeit/v7"
	"github.com/pterm/pterm"
)

func main() {
	// Load .env variables and other configurations
	config.Bootstrap()

	logger = pterm.DefaultLogger.WithLevel(pterm.LogLevelTrace)

	pterm.DefaultBasicText.Println("You can use the" + pterm.LightYellow(" arrow keys ") + "to navigate between options.")

	genType, _ := pterm.DefaultInteractiveSelect.WithOptions(genOptions).Show()
	sCount, _ := pterm.DefaultInteractiveTextInput.Show("How many do you want to generate? (Between 1 and 10 000)")
	count, err := strconv.ParseInt(sCount, 10, 32)

	if err != nil || count < 1 || count > 10_000 {
		logger.Error("Invalid count. Terminating.", logger.Args("count", count))
		return
	}

	logger.Info("Generating data", logger.Args("count", count, "type", genType))

	err = generateAndInsert(genType, int(count))

	if err != nil {
		logger.Fatal("Encountered error. Terminating", logger.Args("error", err.Error()))
		return
	}

	logger.Info("Completed successfully")
}

func generateAndInsert(genType string, count int) error {
	switch genType {
	case "user":
		return handleUser(count)
	case "hservice":
		return handleHService(count)
	case "bookmarks":
		return handleBookmarks(count)
	case "favorites":
		return handleFavorites(count)
	case "lists":
		return handleLists(count)
	case "list-items":
		return handleListItems(count)
	default:
		logger.Error("Invalid generating type.")
		return nil
	}
}

var database *db.Db
var logger *pterm.Logger

func GetDb() *db.Db {
	if database == nil {
		database = db.NewDb()
	}
	return database
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

var genOptions = []string{"user", "hservice", "bookmarks", "favorites", "lists", "list-items"}

func GetRandomImageUrl() string {
	return fmt.Sprintf("https://loremflickr.com/960/720?lock=%d", gofakeit.IntRange(1, 10_000))
}
