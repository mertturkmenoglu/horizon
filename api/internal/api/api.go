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
	"horizon/internal/api/lists"
	"horizon/internal/api/notifications"
	"horizon/internal/api/reviews"
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
	"github.com/labstack/echo/v4/middleware"
	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

// Service struct is the main definition of all the different dependencies
// that are needed to run the application.
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

type Modules struct {
	Auth          *auth.Module
	Uploads       *uploads.Module
	HServices     *hservices.Module
	Users         *users.Module
	Aggregations  *aggregations.Module
	Health        *health.Module
	Bookmarks     *bookmarks.Module
	Favorites     *favorites.Module
	Lists         *lists.Module
	Notifications *notifications.Module
	Reviews       *reviews.Module
}

// New returns a new Service instance.
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

// RegisterRoutes registers all the routes for the application.
func (s *Service) RegisterRoutes() *echo.Echo {
	e := echo.New()

	m := Modules{
		Auth:          auth.New(s.Db, s.Flake, s.Logger, s.Tasks, s.Cache),
		Uploads:       uploads.New(s.Upload),
		HServices:     hservices.New(s.Db, s.Flake, s.Logger),
		Users:         users.New(s.Db, s.Flake, s.Logger),
		Aggregations:  aggregations.New(s.Db, s.Logger, s.Cache),
		Health:        health.New(),
		Bookmarks:     bookmarks.New(s.Db, s.Flake, s.Cache, s.Logger),
		Favorites:     favorites.New(s.Db, s.Flake, s.Logger, s.Cache),
		Lists:         lists.New(s.Db, s.Flake, s.Logger),
		Notifications: notifications.New(),
		Reviews:       reviews.New(s.Db, s.Flake, s.Logger, s.Cache),
	}

	api := e.Group("/api")

	api.Use(middlewares.GetSessionMiddleware())

	authRoutes := api.Group("/auth")
	{
		authRoutes.GET("/google", m.Auth.HandlerGoogle)
		authRoutes.GET("/google/callback", m.Auth.HandlerGoogleCallback)
		authRoutes.GET("/me", m.Auth.HandlerGetMe, middlewares.IsAuth)
		authRoutes.POST("/logout", m.Auth.HandlerLogout)
		authRoutes.POST("/credentials/login", m.Auth.HandlerCredentialsLogin, middlewares.ParseBody[auth.LoginRequestDto])
		authRoutes.POST("/credentials/register", m.Auth.HandlerCredentialsRegister, middlewares.ParseBody[auth.RegisterRequestDto])
		authRoutes.POST("/verify-email/send", m.Auth.HandlerSendVerificationEmail, middlewares.ParseBody[auth.SendVerificationEmailRequestDto])
		authRoutes.GET("/verify-email/verify", m.Auth.HandlerVerifyEmail)
		authRoutes.POST("/forgot-password/send", m.Auth.HandlerSendForgotPasswordEmail, middlewares.ParseBody[auth.SendForgotPasswordEmailRequestDto])
		authRoutes.POST("/forgot-password/reset", m.Auth.HandlerResetPassword, middlewares.ParseBody[auth.ResetPasswordRequestDto])
	}

	uploadsRoutes := api.Group("/uploads")
	{
		uploadsRoutes.GET("/new-url", m.Uploads.HandlerGetNewUrl, middlewares.IsAuth)
	}

	hservicesRoutes := api.Group("/hservices")
	{
		hservicesRoutes.POST("/", m.HServices.HandlerCreateHService, middlewares.IsAuth, middlewares.ParseBody[hservices.CreateHServiceRequestDto])
		hservicesRoutes.GET("/", m.HServices.HandlerGetMyHServices, middlewares.IsAuth)
		hservicesRoutes.GET("/:id", m.HServices.HandlerGetHServiceById, middlewares.WithAuth)
		hservicesRoutes.GET("/user/:username", m.HServices.HandlerGetHServicesByUsername)
	}

	usersRoutes := api.Group("/users")
	{
		usersRoutes.GET("/:username", m.Users.HandlerGetUserProfileByUsername)
	}

	aggregationsRoutes := api.Group("/aggregations")
	{
		aggregationsRoutes.Use(middleware.RateLimiterWithConfig(middlewares.GetRateLimiterConfig()))
		aggregationsRoutes.GET("/home", m.Aggregations.HandlerGetHomeAggregations)
	}

	healthRoutes := api.Group("/health")
	{
		healthRoutes.GET("/", m.Health.HandlerGetHealth)
	}

	bookmarksRoutes := api.Group("/bookmarks")
	{
		bookmarksRoutes.POST("/", m.Bookmarks.HandlerCreateBookmark, middlewares.IsAuth, middlewares.ParseBody[bookmarks.CreateBookmarkRequestDto])
		bookmarksRoutes.DELETE("/:hservice_id", m.Bookmarks.HandlerDeleteBookmark, middlewares.IsAuth)
		bookmarksRoutes.GET("/", m.Bookmarks.HandlerGetBookmarks, middlewares.IsAuth)
		bookmarksRoutes.GET("/:hservice_id", m.Bookmarks.HandlerGetIsBookmarked, middlewares.IsAuth)
	}

	favoritesRoutes := api.Group("/favorites")
	{
		favoritesRoutes.POST("/", m.Favorites.HandlerCreateFavorite, middlewares.IsAuth, middlewares.ParseBody[favorites.CreateFavoriteRequestDto])
		favoritesRoutes.DELETE("/:hservice_id", m.Favorites.HandlerDeleteFavorite, middlewares.IsAuth)
		favoritesRoutes.GET("/", m.Favorites.HandlerGetFavorites, middlewares.IsAuth)
		favoritesRoutes.GET("/:hservice_id", m.Favorites.HandlerGetIsFavorite, middlewares.IsAuth)
		favoritesRoutes.GET("/username/:username", m.Favorites.HandlerGetFavoritesByUsername)
	}

	listsRoutes := api.Group("/lists")
	{
		listsRoutes.GET("/", m.Lists.HandlerGetMyLists, middlewares.IsAuth)
		listsRoutes.GET("/user/:username", m.Lists.HandlerGetUsersLists)
		listsRoutes.GET("/info/:hservice_id", m.Lists.HandlerGetItemListInfo, middlewares.IsAuth)
		listsRoutes.GET("/:id", m.Lists.HandlerGetListById)
		listsRoutes.POST("/", m.Lists.HandlerCreateList, middlewares.IsAuth, middlewares.ParseBody[lists.CreateListRequestDto])
		listsRoutes.POST("/:id/items", m.Lists.HandlerCreateListItem, middlewares.IsAuth, middlewares.ParseBody[lists.CreateListItemRequestDto])
		listsRoutes.DELETE("/:id", m.Lists.HandlerDeleteList, middlewares.IsAuth)
		listsRoutes.DELETE("/:id/items/:itemId", m.Lists.HandlerDeleteListItem, middlewares.IsAuth)
	}

	notificationsRoutes := api.Group("/notifications")
	{
		notificationsRoutes.GET("/", m.Notifications.HandlerGetAll, middlewares.IsAuth)
		notificationsRoutes.GET("/unread", m.Notifications.HandlerGetUnread, middlewares.IsAuth)
		notificationsRoutes.POST("/read", m.Notifications.HandlerReadAll, middlewares.IsAuth)
		notificationsRoutes.POST("/read/:id", m.Notifications.HandlerReadOne, middlewares.IsAuth)
		notificationsRoutes.POST("/unread", m.Notifications.HandlerUnreadAll, middlewares.IsAuth)
		notificationsRoutes.POST("/unread/:id", m.Notifications.HandlerUnreadOne, middlewares.IsAuth)
		notificationsRoutes.DELETE("/", m.Notifications.HandlerDeleteAll, middlewares.IsAuth)
		notificationsRoutes.DELETE("/read", m.Notifications.HandlerDeleteRead, middlewares.IsAuth)
	}

	m.Reviews.RegisterRoutes(api)

	return e
}
