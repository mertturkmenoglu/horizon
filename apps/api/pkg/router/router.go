package router

import (
	"horizon/pkg/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Bootstrap(e *echo.Echo) {
	api := e.Group("/api/v1")

	api.GET("/hello", func(ctx echo.Context) error {
		return ctx.JSON(http.StatusOK, h.Response{
			"message": "Hello World",
		})
	})
}
