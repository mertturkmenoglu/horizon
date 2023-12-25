package main

import (
	"fmt"
	"horizon/pkg/router"
	"horizon/pkg/validation"
	"log"
	"os"

	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	e := echo.New()
	e.Validator = &validation.CustomValidator{
		Validator: validator.New(),
	}

	e.Use(middleware.Recover())
	e.Use(middleware.Logger())
	e.Use(middleware.CORS())

	router.Bootstrap(e)

	port := os.Getenv("PORT")
	port = fmt.Sprintf(":%s", port)

	e.Logger.Fatal(e.Start(port))
}
