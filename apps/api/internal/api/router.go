package api

import (
	"context"
	"fmt"
	"horizon/internal/api/auth"
	"horizon/internal/db"
	"math/rand/v2"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

func (app *App) RegisterRoutes() *echo.Echo {
	e := echo.New()

	authModule := auth.AuthModule{}

	e.Use(session.Middleware(sessions.NewCookieStore([]byte("secret-key"))))

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

	e.GET("/api/auth/google", authModule.HandlerGoogle)

	e.GET("/api/auth/google/callback", authModule.HandlerGoogleCallback)

	e.GET("/api/auth/me", authModule.HandlerGetMe)

	e.POST("/api/auth/logout", authModule.HandlerLogout)

	return e
}
