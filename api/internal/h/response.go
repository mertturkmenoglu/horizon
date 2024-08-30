// Package h provides utility/helper types you would need when you are returning
// a JSON response from a handler.
package h

import (
	"errors"
	"horizon/internal/pagination"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

// Response
// @Description Response
type R struct {
	Data any `json:"data" validate:"required"`
} //@name HR

// Paginated Response
// @Description Paginated Response
type PR struct {
	Data       any                   `json:"data" validate:"required"`
	Pagination pagination.Pagination `json:"pagination" validate:"required"`
} //@name HPR

// Metadata Response
// @Description Metadata Response
type MR struct {
	Data any `json:"data" validate:"required"`
	Meta any `json:"metadata" validate:"required"`
} //@name HMR

// Utility type to wrap arbitrary JSON responses
type Response[T any] struct {
	Data T `json:"data"`
} //@name HResponse

// A PaginatedResponse is similar to [horizon/internal/h/Response] type but it is used for
// returning paginated data.
type PaginatedResponse[T any] struct {
	Data       T                     `json:"data"`
	Pagination pagination.Pagination `json:"pagination"`
} //@name HPaginatedResponse

// An AnyResponse type is usually used to return an arbitrary map value and it doesn't require
// you to specify the data type.
type AnyResponse map[string]interface{}

// An ErrResponse is used to return an error message in a HTTP response.
type ErrResponse struct {
	Message string `json:"message"`
}

func HandleDbErr(c echo.Context, err error) error {
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, ErrResponse{
				Message: "not found",
			})
		}

		return echo.ErrInternalServerError
	}

	return nil
}
