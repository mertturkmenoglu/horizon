package api

import (
	"fmt"
	"horizon/config"
	"horizon/internal/db"
	"horizon/internal/logs"
	"horizon/internal/middlewares"
	"horizon/internal/upload"
	"horizon/internal/validation"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

type App struct {
	Port       int
	PortString string
	Upload     *upload.Upload
	Logger     *zap.Logger
	Flake      *sonyflake.Sonyflake
	Db         *db.Db
}

func New() *App {
	apiObj := &App{
		Upload:     upload.New(),
		Flake:      nil,
		Logger:     logs.New(),
		Port:       viper.GetInt(config.PORT),
		PortString: fmt.Sprintf(":%d", viper.GetInt(config.PORT)),
		Db:         db.NewDb(),
	}

	flake, err := sonyflake.New(sonyflake.Settings{})

	if err != nil {
		panic(err.Error())
	}

	apiObj.Flake = flake

	return apiObj
}

func SetupMiddlewares(e *echo.Echo) {
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
