package api

import (
	"fmt"
	"horizon/config"
	"horizon/internal/api/auth"
	"horizon/internal/db"
	"horizon/internal/logs"
	"horizon/internal/middlewares"
	"horizon/internal/upload"

	"github.com/labstack/echo/v4"
	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

type Service struct {
	Port       int
	PortString string
	Upload     *upload.Upload
	Logger     *zap.Logger
	Flake      *sonyflake.Sonyflake
	Db         *db.Db
}

func New() *Service {
	apiObj := &Service{
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

func (s *Service) RegisterRoutes() *echo.Echo {
	e := echo.New()
	authModule := auth.NewAuthService(s.Db)
	api := e.Group("/api")

	api.Use(middlewares.GetSessionMiddleware())

	authRoutes := api.Group("/auth")
	{
		authRoutes.GET("/google", authModule.HandlerGoogle)
		authRoutes.GET("/google/callback", authModule.HandlerGoogleCallback)
		authRoutes.GET("/me", authModule.HandlerGetMe)
		authRoutes.POST("/logout", authModule.HandlerLogout)
	}

	return e
}
