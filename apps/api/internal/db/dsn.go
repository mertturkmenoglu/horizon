package db

import (
	"fmt"
	"horizon/config"

	"github.com/spf13/viper"
)

func getDsnFromEnv() string {
	dbUser := viper.GetString(config.DB_USER)
	dbPassword := viper.GetString(config.DB_PASSWORD)
	dbHost := viper.GetString(config.DB_HOST)
	dbName := viper.GetString(config.DB_NAME)
	dbPort := viper.GetInt(config.DB_PORT)
	dbTimezone := viper.GetString(config.DB_TIMEZONE)

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=%s", dbHost, dbUser, dbPassword, dbName, dbPort, dbTimezone)

	return dsn
}
