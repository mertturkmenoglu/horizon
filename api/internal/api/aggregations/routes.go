package aggregations

import (
	"horizon/internal/middlewares"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func (m *Module) RegisterRoutes(e *echo.Group) {
	routes := e.Group("/aggregations")
	{
		routes.Use(middleware.RateLimiterWithConfig(middlewares.GetRateLimiterConfig()))
		routes.GET("/home", m.handlers.HandlerGetHomeAggregations)
	}
}
