package favorites

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/db/query"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"net/http"

	"github.com/labstack/echo/v4"
)

func CreateFavorite(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	body := c.Get("body").(dto.CreateFavoriteRequest)

	var fav *models.Favorite

	res := db.Client.
		Where("service_id = ?", body.ServiceId).
		Where("user_id = ?", auth.UserId).
		First(&fav)

	if res.Error == nil {
		return api.NewBadRequestError("already exists")
	}

	service, err := query.FindById[models.Service](body.ServiceId)

	if err != nil {
		return err
	}

	newFav := models.Favorite{
		ServiceId: service.Id,
		UserId:    auth.UserId,
	}

	res = db.Client.Create(&newFav)

	if res.Error != nil {
		return api.NewInternalServerError(res.Error)
	}

	return c.JSON(http.StatusOK, h.Response[dto.FavoriteDto]{
		"data": dto.FavoriteDto{
			Id:        newFav.Id.String(),
			ServiceId: newFav.ServiceId,
			UserId:    newFav.UserId,
		},
	})
}

func DeleteFavorite(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	id := c.Param("id")

	if id == "" {
		return api.NewBadRequestError("id is required")
	}

	favorite, err := query.FindById[models.Favorite](id)

	if err != nil {
		return err
	}

	if favorite.UserId != auth.UserId {
		return api.NewForbiddenError()
	}

	res := db.Client.Delete(favorite)

	if res.Error != nil {
		return api.NewInternalServerError(res.Error)
	}

	return c.NoContent(http.StatusNoContent)
}

func GetMyFavorites(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)

	var favs []*models.Favorite

	res := db.Client.
		Where("user_id = ?", auth.UserId).
		Order("created_at DESC").
		Limit(256).
		Find(&favs)

	if res.Error != nil {
		return api.NewInternalServerError(res.Error)
	}

	dtos := make([]dto.FavoriteDto, len(favs))

	for i, f := range favs {
		dtos[i] = dto.FavoriteDto{
			Id:        f.Id.String(),
			ServiceId: f.ServiceId,
			UserId:    f.UserId,
		}
	}

	return c.JSON(http.StatusOK, h.Response[dto.MyFavoritesResponse]{
		"data": dtos,
	})
}
