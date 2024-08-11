package api

import (
	"context"
	"fmt"
	"horizon/internal/db"
	"math/rand/v2"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

func (app *App) RegisterRoutes() *echo.Echo {
	e := echo.New()

	e.POST("/authors", func(c echo.Context) error {
		ctx := context.Background()

		inserted, err := app.Db.Queries.CreateAuthor(ctx, db.CreateAuthorParams{
			Name: fmt.Sprintf("Name %d", rand.IntN(100)),
			Bio:  pgtype.Text{String: fmt.Sprintf("Bio %d", rand.IntN(100)), Valid: true},
		})

		if err != nil {
			return echo.ErrInternalServerError.WithInternal(err)
		}

		return c.JSON(http.StatusCreated, inserted)
	})

	e.GET("/authors", func(c echo.Context) error {
		ctx := context.Background()

		authors, err := app.Db.Queries.ListAuthors(ctx)

		if err != nil {
			return echo.ErrInternalServerError.WithInternal(err)
		}

		return c.JSON(http.StatusOK, authors)
	})

	return e
}
