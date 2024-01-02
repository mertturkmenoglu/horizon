package config

import (
	"fmt"
	"log"
	"os"

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

	smtpPassword, ok := os.LookupEnv("SMTP_PASSWORD")

	if !ok {
		log.Fatal("Set SMTP_PASSWORD variable through environment variables")
	}

	viper.Set("smtp.password", smtpPassword)

	email, ok := os.LookupEnv("EMAIL")

	if !ok {
		log.Fatal("Set EMAIL variable through environment variables")
	}

	viper.Set("email.from", email)
	viper.Set("smtp.email", email)
}
