package notifications

import "github.com/labstack/echo/v4"

func (m *Module) RegisterRoutes(e *echo.Group) {
	routes := e.Group("/notifications")
	{
		routes.GET("/", m.handlers.GetAll)
		routes.GET("/unread", m.handlers.GetUnread)
		routes.POST("/read", m.handlers.ReadAll)
		routes.POST("/read/:id", m.handlers.ReadOne)
		routes.POST("/unread", m.handlers.UnreadAll)
		routes.POST("/unread/:id", m.handlers.UnreadOne)
		routes.DELETE("/", m.handlers.DeleteAll)
		routes.DELETE("/read", m.handlers.DeleteRead)
	}
}
