package notifications

import (
	"horizon/internal/h"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *handlers) GetAll(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (s *handlers) GetUnread(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (s *handlers) ReadAll(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (s *handlers) ReadOne(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (s *handlers) UnreadAll(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (s *handlers) UnreadOne(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (s *handlers) DeleteAll(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}

func (s *handlers) DeleteRead(c echo.Context) error {
	return c.JSON(http.StatusNotImplemented, h.ErrResponse{
		Message: "not implemented",
	})
}
