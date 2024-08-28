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

// Application struct is the main definition of all the different dependencies
// that are needed to run the application.
type Application struct {
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

// New returns a new Service instance.
func New() *Application {
	apiObj := &Application{
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
func (s *Application) RegisterRoutes() *echo.Echo {
	e := echo.New()

	modules := []IModule{
		auth.New(s.Db, s.Flake, s.Logger, s.Cache, s.Tasks),
		uploads.New(s.Upload),
		hservices.New(s.Db, s.Flake, s.Logger),
		users.New(s.Db, s.Flake, s.Logger),
		aggregations.New(s.Db, s.Cache),
		health.New(),
		bookmarks.New(s.Db, s.Flake, s.Cache, s.Logger),
		favorites.New(s.Db, s.Flake, s.Logger, s.Cache),
		lists.New(s.Db, s.Flake, s.Logger),
		notifications.New(),
		reviews.New(s.Db, s.Flake, s.Logger, s.Cache),
	}

	api := e.Group("/api")

	api.Use(middlewares.GetSessionMiddleware())

	for _, module := range modules {
		module.RegisterRoutes(api)
	}

	return e
}
