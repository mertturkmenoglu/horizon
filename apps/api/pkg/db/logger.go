package db

import (
	"os"

	"gorm.io/gorm/logger"
)

func getLogLevelFromEnv() logger.LogLevel {
	lvl := logger.Silent
	debug := os.Getenv("DEBUG")

	if debug == "true" {
		lvl = logger.Info
	}

	return lvl
}
