package api

import (
	"fmt"
	"horizon/config"
	"horizon/internal/api/auth"
	"horizon/internal/api/hservices"
	"horizon/internal/api/uploads"
	"horizon/internal/db"
	"horizon/internal/logs"
	"horizon/internal/middlewares"
	"horizon/internal/search"
	"horizon/internal/upload"

	"github.com/labstack/echo/v4"
	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
	"github.com/typesense/typesense-go/v2/typesense"
	"go.uber.org/zap"
)

type Service struct {
	Port       int
	PortString string
	Upload     *upload.Upload
	ZapLogger  *zap.Logger
	Flake      *sonyflake.Sonyflake
	Db         *db.Db
	Search     *typesense.Client
	Logger     *pterm.Logger
}

func New() *Service {
	apiObj := &Service{
		Upload:     upload.New(),
		Flake:      nil,
		ZapLogger:  logs.New(),
		Port:       viper.GetInt(config.PORT),
		PortString: fmt.Sprintf(":%d", viper.GetInt(config.PORT)),
		Db:         db.NewDb(),
		Search:     search.New(),
		Logger:     logs.NewPTermLogger(),
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

	authModule := auth.NewAuthService(s.Db, s.Flake, s.Logger)
	uploadsModule := uploads.NewUploadsService(s.Upload)
	hservicesModule := hservices.NewHServicesService(s.Db, s.Flake, s.Logger)

	api := e.Group("/api")

	api.Use(middlewares.GetSessionMiddleware())

	authRoutes := api.Group("/auth")
	{
		authRoutes.GET("/google", authModule.HandlerGoogle)
		authRoutes.GET("/google/callback", authModule.HandlerGoogleCallback)
		authRoutes.GET("/me", authModule.HandlerGetMe, middlewares.IsAuth)
		authRoutes.POST("/logout", authModule.HandlerLogout)
		authRoutes.POST("/credentials/login", authModule.HandlerCredentialsLogin, middlewares.ParseBody[auth.LoginRequestDto])
		authRoutes.POST("/credentials/register", authModule.HandlerCredentialsRegister, middlewares.ParseBody[auth.RegisterRequestDto])
	}

	uploadsRoutes := api.Group("/uploads")
	{
		uploadsRoutes.GET("/new-url", uploadsModule.HandlerGetNewUrl, middlewares.IsAuth)
	}

	hservicesRoutes := api.Group("/hservices")
	{
		hservicesRoutes.POST("/", hservicesModule.HandlerCreateHService, middlewares.IsAuth, middlewares.ParseBody[hservices.CreateHServiceRequestDto])
		hservicesRoutes.GET("/", hservicesModule.HandlerGetMyHServices, middlewares.IsAuth)
		hservicesRoutes.GET("/:id", hservicesModule.HandlerGetHServiceById)
	}

	return e
}
