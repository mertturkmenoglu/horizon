package main

import (
	"fmt"
	"horizon/config"
	"horizon/internal/api/v1/router"
	"horizon/internal/db"
	"horizon/internal/geo"
	"horizon/internal/tasks"
	"horizon/internal/upload"
	"horizon/internal/validation"

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

	// Enable tracing middleware
	c := jaegertracing.New(e, nil)
	defer c.Close()

	if viper.GetString("env") == "dev" {
		// Extracts the IP address directly from request.
		// If the application doesn't face the web directly
		// this extractor shouldn't be used.
		// TODO: Setup IP extractors for different environments
		e.IPExtractor = echo.ExtractIPDirect()

		e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
			Format: viper.GetString("api.logger.format"),
		}))

		e.Use(middleware.RequestID())

		e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins:                             middleware.DefaultCORSConfig.AllowOrigins,
			AllowMethods:                             middleware.DefaultCORSConfig.AllowMethods,
			AllowHeaders:                             middleware.DefaultCORSConfig.AllowHeaders,
			AllowCredentials:                         true,
			UnsafeWildcardOriginWithAllowCredentials: true,
		}))

		e.Use(middleware.BodyDump(func(ctx echo.Context, b1, b2 []byte) {
			sp := jaegertracing.CreateChildSpan(ctx, ctx.Response().Header().Get(echo.HeaderXRequestID))
			defer sp.Finish()
			sp.SetBaggageItem("Request", string(b1))
			sp.SetBaggageItem("Response", string(b2))
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

	// Init ip2location
	geo.New()

	// Read geocoding data
	geo.LoadGeocodingDataFromFile(viper.GetString("api.geo.geocode"))

	// Init upload service
	upload.New()

	// Attach handlers to paths
	router.RegisterRoutes(e)

	// Get port from Viper and convert it to string
	iPort := viper.GetInt("port")
	port := fmt.Sprintf(":%d", iPort)

	// Start the Echo server
	// If port binding fails, terminate the server.
	e.Logger.Fatal(e.Start(port))
}
