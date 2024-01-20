package favorites

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db/models"
	"horizon/internal/db/query"
	"horizon/internal/jsonwebtoken"

	"github.com/labstack/echo/v4"
)

func createFavoriteValidation(c echo.Context) (*models.Service, error) {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.CreateFavoriteRequest)
	_, err := getFavoriteByServiceIdAndUserId(
		body.ServiceId,
		auth.UserId,
	)

	if err == nil {
		return nil, api.NewBadRequestError("already exists")
	}

	service, err := query.FindById[models.Service](body.ServiceId)

	if err != nil {
		return nil, err
	}

	return service, nil
}

func deleteFavoriteValidation(c echo.Context) (*models.Favorite, error) {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	id := c.Param("id")

	if id == "" {
		return nil, api.NewBadRequestError("id is required")
	}

	favorite, err := query.FindById[models.Favorite](id)

	if err != nil {
		return nil, err
	}

	if favorite.UserId != auth.UserId {
		return nil, api.NewForbiddenError()
	}

	return favorite, nil
}
