package main

import (
	"context"
	"horizon/config"
	"horizon/internal/api"
	"horizon/internal/db"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/labstack/echo-contrib/echoprometheus"
	"github.com/labstack/echo/v4"
	"github.com/prometheus/client_golang/prometheus"

	echoSwagger "github.com/swaggo/echo-swagger"

	_ "horizon/swaggerdocs"
)

//	@title			Horizon API
//	@version		1.0
//	@description	Horizon backend services
//	@termsOfService	http://localhost:3000/terms
//	@contact.name	Mert Turkmenoglu
//	@contact.url	https://mertturkmenoglu.com
//	@contact.email	gethorizonapp@gmail.com
//	@license.name	MIT
//	@license.url	https://mit-license.org/
//	@host			localhost:5000
//	@BasePath		/api
func main() {
	config.Bootstrap()

	a := api.New()
	e := a.RegisterRoutes()

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	api.InitGlobalMiddlewares(e)

	shouldRunMigrations := os.Getenv("RUN_MIGRATIONS")

	if shouldRunMigrations == "1" {
		db.RunMigrations()
	}

	go a.Tasks.Run()
	defer a.Tasks.Close()

	// create new counter metric. This is replacement for `prometheus.Metric` struct
	customCounter := prometheus.NewCounter(
		prometheus.CounterOpts{
			Name: "custom_requests_total",
			Help: "How many HTTP requests processed, partitioned by status code and HTTP method.",
		},
	)

	// register your new counter metric with default metrics registry
	if err := prometheus.Register(customCounter); err != nil {
		log.Fatal(err)
	}

	e.Use(echoprometheus.NewMiddlewareWithConfig(echoprometheus.MiddlewareConfig{
		AfterNext: func(c echo.Context, err error) {
			customCounter.Inc() // use our custom metric in middleware. after every request increment the counter
		},
	}))

	// e.Use(echoprometheus.NewMiddleware("horizon")) // adds middleware to gather metrics
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
