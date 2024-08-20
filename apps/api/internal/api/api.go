package api

import (
	"fmt"
	"horizon/config"
	"horizon/internal/api/aggregations"
	"horizon/internal/api/auth"
	"horizon/internal/api/bookmarks"
	"horizon/internal/api/favorites"
	"horizon/internal/api/health"
	"horizon/internal/api/hservices"
	"horizon/internal/api/uploads"
	"horizon/internal/api/users"
	"horizon/internal/cache"
	"horizon/internal/db"
	"horizon/internal/email"
	"horizon/internal/logs"
	"horizon/internal/middlewares"
	"horizon/internal/search"
	"horizon/internal/tasks"
	"horizon/internal/upload"

	"github.com/labstack/echo/v4"
	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

type Service struct {
	Port       int
	PortString string
	Upload     *upload.Upload
	ZapLogger  *zap.Logger
	Flake      *sonyflake.Sonyflake
	Db         *db.Db
	Search     *search.Search
	Logger     *pterm.Logger
	Cache      *cache.Cache
	Email      *email.EmailService
	Tasks      *tasks.Tasks
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
		Cache:      cache.New(),
		Email:      email.New(),
		Tasks:      nil,
	}

	flake, err := sonyflake.New(sonyflake.Settings{})

	if err != nil {
		panic(err.Error())
	}

	apiObj.Flake = flake
	apiObj.Tasks = tasks.New(apiObj.Email)

	return apiObj
}

func (s *Service) RegisterRoutes() *echo.Echo {
	e := echo.New()

	authModule := auth.NewAuthService(s.Db, s.Flake, s.Logger, s.Tasks)
	uploadsModule := uploads.NewUploadsService(s.Upload)
	hservicesModule := hservices.NewHServicesService(s.Db, s.Flake, s.Logger)
	usersModule := users.NewUsersService(s.Db, s.Flake, s.Logger)
	aggregationsModule := aggregations.NewAggregationsService(s.Db, s.Logger, s.Cache)
	healthModule := health.NewHealthService()
	bookmarksModule := bookmarks.NewBookmarksService(s.Db, s.Flake, s.Cache, s.Logger)
	favoritesModule := favorites.NewFavoritesService(s.Db, s.Flake, s.Logger, s.Cache)

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
		hservicesRoutes.GET("/:id", hservicesModule.HandlerGetHServiceById, middlewares.WithAuth)
	}

	usersRoutes := api.Group("/users")
	{
		usersRoutes.GET("/:username", usersModule.HandlerGetUserProfileByUsername)
	}

	aggregationsRoutes := api.Group("/aggregations")
	{
		aggregationsRoutes.GET("/home", aggregationsModule.HandlerGetHomeAggregations)
	}

	healthRoutes := api.Group("/health")
	{
		healthRoutes.GET("/", healthModule.HandlerGetHealth)
	}

	bookmarksRoutes := api.Group("/bookmarks")
	{
		bookmarksRoutes.POST("/", bookmarksModule.HandlerCreateBookmark, middlewares.IsAuth, middlewares.ParseBody[bookmarks.CreateBookmarkRequestDto])
		bookmarksRoutes.DELETE("/:hservice_id", bookmarksModule.HandlerDeleteBookmark, middlewares.IsAuth)
		bookmarksRoutes.GET("/", bookmarksModule.HandlerGetBookmarks, middlewares.IsAuth)
		bookmarksRoutes.GET("/:hservice_id", bookmarksModule.HandlerGetIsBookmarked, middlewares.IsAuth)
	}

	favoritesRoutes := api.Group("/favorites")
	{
		favoritesRoutes.POST("/", favoritesModule.HandlerCreateFavorite, middlewares.IsAuth, middlewares.ParseBody[favorites.CreateFavoriteRequestDto])
		favoritesRoutes.DELETE("/:hservice_id", favoritesModule.HandlerDeleteFavorite, middlewares.IsAuth)
		favoritesRoutes.GET("/", favoritesModule.HandlerGetFavorites, middlewares.IsAuth)
		favoritesRoutes.GET("/:hservice_id", favoritesModule.HandlerGetIsFavorite, middlewares.IsAuth)
		favoritesRoutes.GET("/username/:username", favoritesModule.HandlerGetFavoritesByUsername)
	}

	return e
}
