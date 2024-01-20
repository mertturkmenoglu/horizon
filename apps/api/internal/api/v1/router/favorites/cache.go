package favorites

import (
	"fmt"
	"horizon/internal/api"
	"horizon/internal/db/models"
	"time"
)

func invalidateCache(userId string) {
	_ = api.App.Cache.Del("favorites:" + userId)
}

func writeCache(userId string, favs []*models.Favorite) {
	err := api.App.Cache.SetObj("favorites:"+userId, favs, 12*time.Hour)
	fmt.Println(err)
}

func readCache(userId string) ([]*models.Favorite, error) {
	var favs []*models.Favorite
	err := api.App.Cache.ReadObj("favorites:"+userId, &favs)
	return favs, err
}
