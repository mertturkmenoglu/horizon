package main

import (
	"fmt"
	"horizon/config"
	"horizon/internal/api/v1/router"
	"horizon/internal/db"
	"horizon/internal/tasks"
	"horizon/internal/validation"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"
)

func main() {
	config.Bootstrap()

	e := echo.New()
	e.Validator = &validation.CustomValidator{
		Validator: validator.New(),
	}

	e.Use(middleware.Recover())

	if viper.GetString("env") == "dev" {
		e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
			Format: viper.GetString("api.logger.format"),
		}))

		e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins:                             middleware.DefaultCORSConfig.AllowOrigins,
			AllowMethods:                             middleware.DefaultCORSConfig.AllowMethods,
			AllowHeaders:                             middleware.DefaultCORSConfig.AllowHeaders,
			AllowCredentials:                         true,
			UnsafeWildcardOriginWithAllowCredentials: true,
		}))
	}

	// Call once to initialize the database connection
	// Panics if the connection fails
	db.Init()

	// Call only once to make sure the database schema is up-to-date
	// All database entities are registered under this function
	if err := db.AutoMigrate(); err != nil {
		panic(err.Error())
	}

	// Call only once to initialize the tasks service
	// Needs to run in a different goroutine
	// Serves as a background worker
	go tasks.Init()
	defer tasks.Close()

	router.Bootstrap(e)

	iPort := viper.GetInt("port")
	port := fmt.Sprintf(":%d", iPort)

	e.Logger.Fatal(e.Start(port))
}
