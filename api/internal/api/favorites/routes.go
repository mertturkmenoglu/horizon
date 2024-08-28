package favorites

import (
	"horizon/internal/middlewares"

	"github.com/labstack/echo/v4"
)

func (m *Module) RegisterRoutes(e *echo.Group) {
	routes := e.Group("/favorites")
	{
		routes.POST("/",
			m.handlers.CreateFavorite, middlewares.IsAuth, middlewares.ParseBody[CreateFavoriteRequestDto])
		routes.DELETE("/:hservice_id", m.handlers.DeleteFavorite, middlewares.IsAuth)
		routes.GET("/", m.handlers.GetFavorites, middlewares.IsAuth)
		routes.GET("/:hservice_id", m.handlers.GetIsFavorite, middlewares.IsAuth)
		routes.GET("/username/:username", m.handlers.GetFavoritesByUsername)
	}
}
