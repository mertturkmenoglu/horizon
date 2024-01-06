package config

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

func Bootstrap() {
	// Load .env file first
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	viper.SetConfigName("dev")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("config/")
	viper.AddConfigPath(".")

	err = viper.ReadInConfig()

	if err != nil {
		log.Fatal(fmt.Sprintf("Cannot read configuration file: %s", err.Error()))
	}
}
