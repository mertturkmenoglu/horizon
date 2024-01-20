package main

import (
	"context"
	"fmt"
	"horizon/config"
	"horizon/internal/api"
	"horizon/internal/api/v1/middlewares"
	"horizon/internal/api/v1/router"
	"horizon/internal/cron"
	"horizon/internal/db"
	"horizon/internal/tasks"
	"horizon/internal/validation"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo-contrib/jaegertracing"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"
)

func main() {
	config.Bootstrap()
	e := echo.New()

	// Attach custom validator
	e.Validator = &validation.CustomValidator{
		Validator: validator.New(),
	}

	e.Use(middleware.Recover())
	e.Use(middleware.RateLimiterWithConfig(middlewares.GetConfig()))

	// Enable tracing middleware
	c := jaegertracing.New(e, nil)
	defer c.Close()

	if viper.GetString("env") == "dev" {
		// Extracts the IP address directly from request.
		// If the application doesn't face the web directly
		// this extractor shouldn't be used.
		// TODO: Setup IP extractors for different environments
		e.IPExtractor = echo.ExtractIPDirect()

		// e.Use(middlewares.Logger())
		e.Use(middleware.RequestID())
		e.Use(middlewares.Cors())
		e.Use(middleware.BodyDump(middlewares.Dump))
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

	api.Init()

	scheduler := cron.New()
	scheduler.Start()

	e.Use(middlewares.ZapLogger())

	// Attach handlers to paths
	router.RegisterRoutes(e)

	// Start the Echo server
	go func() {
		port := fmt.Sprintf(":%d", viper.GetInt("port"))
		if err := e.Start(port); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatal("shutting down the server")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}
