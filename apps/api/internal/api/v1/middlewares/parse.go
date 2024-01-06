package middlewares

import (
	"horizon/internal/api"

	"github.com/labstack/echo/v4"
)

func ParseBody[T any](next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var body T

		if err := c.Bind(&body); err != nil {
			return api.NewBadRequestError(err.Error())
		}

		if err := c.Validate(&body); err != nil {
			return api.NewBadRequestError(err.Error())
		}

		c.Set("body", body)
		return next(c)
	}
}
