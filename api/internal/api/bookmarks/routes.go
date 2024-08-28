package bookmarks

import (
	"horizon/internal/middlewares"

	"github.com/labstack/echo/v4"
)

func (m *Module) RegisterRoutes(e *echo.Group) {
	routes := e.Group("/bookmarks")
	{
		routes.POST(
			"/",
			m.handlers.HandlerCreateBookmark,
			middlewares.IsAuth,
			middlewares.ParseBody[CreateBookmarkRequestDto],
		)
		routes.DELETE(
			"/:hservice_id",
			m.handlers.HandlerDeleteBookmark,
			middlewares.IsAuth,
		)
		routes.GET(
			"/",
			m.handlers.HandlerGetBookmarks,
			middlewares.IsAuth,
		)
		routes.GET(
			"/:hservice_id",
			m.handlers.HandlerGetIsBookmarked,
			middlewares.IsAuth,
		)
	}
}
