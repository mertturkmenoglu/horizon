package authz

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

func IsAdmin(s *Authz, c echo.Context) (bool, error) {
	return false, nil
}

func Identity(s *Authz, c echo.Context) (bool, error) {
	return true, nil
}

func CanDeleteHService(s *Authz, c echo.Context) (bool, error) {
	hserviceId := c.Param("hservice_id")
	userId := c.Get("user_id").(string)
	hservice, err := s.Db.Queries.GetHServiceById(context.Background(), hserviceId)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return false, echo.ErrNotFound
		}
		return false, echo.ErrInternalServerError
	}

	if hservice.Hservice.UserID != userId {
		return false, echo.ErrForbidden
	}

	return true, nil
}
