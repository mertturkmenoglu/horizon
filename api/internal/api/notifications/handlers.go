package notifications

import (
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (m *Module) HandlerGetAll(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (m *Module) HandlerGetUnread(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (m *Module) HandlerReadAll(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (m *Module) HandlerReadOne(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (m *Module) HandlerUnreadAll(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (m *Module) HandlerUnreadOne(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (m *Module) HandlerDeleteAll(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (m *Module) HandlerDeleteRead(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}
