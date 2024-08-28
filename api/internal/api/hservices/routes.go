package hservices

import (
	"horizon/internal/middlewares"

	"github.com/labstack/echo/v4"
)

func (m *Module) RegisterRoutes(e *echo.Group) {
	routes := e.Group("/hservices")
	{
		routes.POST("/", m.handlers.CreateHService, middlewares.IsAuth, middlewares.ParseBody[CreateHServiceRequestDto])
		routes.GET("/", m.handlers.GetMyHServices, middlewares.IsAuth)
		routes.GET("/:id", m.handlers.GetHServiceById, middlewares.WithAuth)
		routes.GET("/user/:username", m.handlers.GetHServicesByUsername)
	}
}
