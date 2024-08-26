package reviews

import (
	"horizon/internal/middlewares"

	"github.com/labstack/echo/v4"
)

func (m *Module) RegisterRoutes(e *echo.Group) {
	routes := e.Group("/reviews")
	{
		routes.GET("/hservice/:id", m.Handlers.getReviewsByHServiceId, middlewares.WithAuth)
		routes.GET("/user/:username", m.Handlers.getReviewsByUsername, middlewares.WithAuth)
		routes.GET("/:id", m.Handlers.getReviewById, middlewares.WithAuth)
		routes.POST("/", m.Handlers.createReview, middlewares.IsAuth, middlewares.ParseBody[CreateReviewRequestDto])
		routes.DELETE("/:id", m.Handlers.deleteReview, middlewares.IsAuth)
		routes.POST("/:id/vote", m.Handlers.createReviewVote, middlewares.IsAuth)
		routes.DELETE("/:id/vote", m.Handlers.deleteReviewVote, middlewares.IsAuth)
	}
}
