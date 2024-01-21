package favorites

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/models"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"net/http"

	"github.com/labstack/echo/v4"
)

func CreateFavorite(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	service, err := createFavoriteValidation(c)

	if err != nil {
		return err
	}

	newFav := models.Favorite{
		ServiceId: service.Id,
		UserId:    auth.UserId,
	}

	res := db.Client.Create(&newFav)

	if res.Error != nil {
		return res.Error
	}

	invalidateCache(auth.UserId)
	return c.JSON(http.StatusOK, h.Response[dto.FavoriteDto]{
		"data": mapModelToDto(&newFav),
	})
}

func DeleteFavorite(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	favorite, err := deleteFavoriteValidation(c)

	if err != nil {
		return err
	}

	res := db.Client.Delete(favorite)

	if res.Error != nil {
		return res.Error
	}

	invalidateCache(auth.UserId)
	return c.NoContent(http.StatusNoContent)
}

func GetMyFavorites(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	favs, err := getMyFavorites(auth.UserId)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, h.Response[dto.MyFavoritesResponse]{
		"data": mapModeltoDtoArr(favs),
	})
}
