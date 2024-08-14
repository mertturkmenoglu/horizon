package api

import (
	"horizon/config"
	"horizon/internal/middlewares"
	"horizon/internal/validation"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"
)

func InitGlobalMiddlewares(e *echo.Echo) {
	e.Validator = &validation.CustomValidator{
		Validator: validator.New(),
	}

	e.Use(middleware.Recover())
	e.Use(middleware.RateLimiterWithConfig(middlewares.GetRateLimiterConfig()))

	if viper.GetString(config.ENV) == "dev" {
		e.IPExtractor = echo.ExtractIPDirect()
		e.Use(middleware.RequestID())
		e.Use(middlewares.Cors())
		e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
			Format: "=> ${time_rfc3339} [${method}] ${uri} (${status}) ${latency_human}\n",
		}))
	}

	e.Use(middlewares.ZapLogger())
	e.Use(middleware.TimeoutWithConfig(middleware.TimeoutConfig{
		Timeout: 10 * time.Second,
	}))
	e.Use(middleware.Secure())
}
