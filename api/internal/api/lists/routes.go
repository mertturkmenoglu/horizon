package lists

import (
	"horizon/internal/middlewares"

	"github.com/labstack/echo/v4"
)

func (m *Module) RegisterRoutes(e *echo.Group) {
	routes := e.Group("/lists")
	{
		routes.GET("/", m.handlers.GetMyLists, middlewares.IsAuth)
		routes.GET("/user/:username", m.handlers.GetUsersLists)
		routes.GET("/info/:hservice_id", m.handlers.GetItemListInfo, middlewares.IsAuth)
		routes.GET("/:id", m.handlers.GetListById)
		routes.POST("/", m.handlers.CreateList, middlewares.IsAuth, middlewares.ParseBody[CreateListRequestDto])
		routes.POST(
			"/:id/items",
			m.handlers.CreateListItem,
			middlewares.IsAuth,
			middlewares.ParseBody[CreateListItemRequestDto],
		)
		routes.PATCH("/:id", m.handlers.UpdateList, middlewares.IsAuth, middlewares.ParseBody[UpdateListRequestDto])
		routes.DELETE("/:id", m.handlers.DeleteList, middlewares.IsAuth)
		routes.DELETE("/:id/items/:itemId", m.handlers.DeleteListItem, middlewares.IsAuth)
	}
}
