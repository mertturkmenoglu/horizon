package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewBadRequestError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusBadRequest, message)
}

func NewUnauthorizedError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusUnauthorized, message)
}

func NewNotFoundError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusNotFound, message)
}

func NewContentTooLargeError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusRequestEntityTooLarge, message)
}

func NewTooManyRequestsError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusTooManyRequests, message)
}

func NewInternalServerError(message ...interface{}) *echo.HTTPError {
	return echo.NewHTTPError(http.StatusInternalServerError, message)
}
