package main

import (
	"context"
	"horizon/config"
	"horizon/internal/api"
	"horizon/internal/db"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/labstack/echo-contrib/echoprometheus"
)

func main() {
	config.Bootstrap()

	a := api.New()
	e := a.RegisterRoutes()

	api.InitGlobalMiddlewares(e)

	shouldRunMigrations := os.Getenv("RUN_MIGRATIONS")

	if shouldRunMigrations == "1" {
		db.RunMigrations()
	}

	go a.Tasks.Run()
	defer a.Tasks.Close()

	e.Use(echoprometheus.NewMiddleware("horizon")) // adds middleware to gather metrics
	e.GET("/metrics", echoprometheus.NewHandler()) // adds route to serve gathered metrics

	// Start the Echo server
	go func() {
		if err := e.Start(a.PortString); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatalf("shutting down the server %v", err.Error())
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}
