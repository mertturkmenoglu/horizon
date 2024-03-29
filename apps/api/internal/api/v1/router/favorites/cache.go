package favorites

import (
	"horizon/internal/api"
	"horizon/internal/models"
	"time"
)

func invalidateCache(userId string) {
	_ = api.App.Cache.Del("favorites:" + userId)
}

func writeCache(userId string, favs []*models.Favorite) {
	api.App.Cache.SetObj("favorites:"+userId, favs, 12*time.Hour)
}

func readCache(userId string) ([]*models.Favorite, error) {
	var favs []*models.Favorite
	err := api.App.Cache.ReadObj("favorites:"+userId, &favs)
	return favs, err
}
