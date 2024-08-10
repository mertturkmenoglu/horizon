package main

import (
	"context"
	"horizon/config"
	"horizon/internal/api"
	"horizon/internal/middlewares"
	"horizon/internal/validation"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"
)

func main() {
	config.Bootstrap()
	a := api.New()
	e := a.RegisterRoutes()

	e.Validator = &validation.CustomValidator{
		Validator: validator.New(),
	}

	e.Use(middleware.Recover())
	e.Use(middleware.RateLimiterWithConfig(middlewares.GetRateLimiterConfig()))

	if viper.GetString(config.ENV) == "dev" {
		e.IPExtractor = echo.ExtractIPDirect()
		e.Use(middleware.RequestID())
		e.Use(middlewares.Cors())
	}

	e.Use(middlewares.ZapLogger())
	e.Use(middleware.TimeoutWithConfig(middleware.TimeoutConfig{
		Timeout: 10 * time.Second,
	}))
	e.Use(middleware.Secure())

	// Start the Echo server
	go func() {
		if err := e.Start(a.PortString); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatalf("shutting down the server %v", err.Error())
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
