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
	"github.com/pterm/pterm"
	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

type IModule interface {
	RegisterRoutes(e *echo.Group)
}

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
		Auth:          auth.New(s.Db, s.Flake, s.Logger, s.Cache, s.Tasks),
		Uploads:       uploads.New(s.Upload),
		HServices:     hservices.New(s.Db, s.Flake, s.Logger),
		Users:         users.New(s.Db, s.Flake, s.Logger),
		Aggregations:  aggregations.New(s.Db, s.Cache),
		Health:        health.New(),
		Bookmarks:     bookmarks.New(s.Db, s.Flake, s.Cache, s.Logger),
		Favorites:     favorites.New(s.Db, s.Flake, s.Logger, s.Cache),
		Lists:         lists.New(s.Db, s.Flake, s.Logger),
		Notifications: notifications.New(),
		Reviews:       reviews.New(s.Db, s.Flake, s.Logger, s.Cache),
	}

	api := e.Group("/api")

	api.Use(middlewares.GetSessionMiddleware())

	m.Auth.RegisterRoutes(api)

	m.Uploads.RegisterRoutes(api)

	m.HServices.RegisterRoutes(api)

	m.Users.RegisterRoutes(api)

	m.Aggregations.RegisterRoutes(api)

	m.Health.RegisterRoutes(api)

	m.Bookmarks.RegisterRoutes(api)

	m.Favorites.RegisterRoutes(api)

	listsRoutes := api.Group("/lists")
	{
		listsRoutes.GET("/", m.Lists.HandlerGetMyLists, middlewares.IsAuth)
		listsRoutes.GET("/user/:username", m.Lists.HandlerGetUsersLists)
		listsRoutes.GET("/info/:hservice_id", m.Lists.HandlerGetItemListInfo, middlewares.IsAuth)
		listsRoutes.GET("/:id", m.Lists.HandlerGetListById)
		listsRoutes.POST("/",
			m.Lists.HandlerCreateList, middlewares.IsAuth, middlewares.ParseBody[lists.CreateListRequestDto])
		listsRoutes.POST("/:id/items",
			m.Lists.HandlerCreateListItem, middlewares.IsAuth, middlewares.ParseBody[lists.CreateListItemRequestDto])
		listsRoutes.DELETE("/:id", m.Lists.HandlerDeleteList, middlewares.IsAuth)
		listsRoutes.DELETE("/:id/items/:itemId", m.Lists.HandlerDeleteListItem, middlewares.IsAuth)
	}

	m.Notifications.RegisterRoutes(api)

	m.Reviews.RegisterRoutes(api)

	return e
}
