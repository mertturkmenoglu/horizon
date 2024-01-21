package favorites

import (
	"horizon/internal/db"
	"horizon/internal/models"
)

func getFavoriteByServiceIdAndUserId(serviceId string, userId string) (*models.Favorite, error) {
	var fav *models.Favorite

	res := db.Client.
		Where("service_id = ?", serviceId).
		Where("user_id = ?", userId).
		First(&fav)

	return fav, res.Error
}

func getMyFavorites(userId string) ([]*models.Favorite, error) {
	cacheFavs, err := readCache(userId)

	if err == nil {
		return cacheFavs, nil
	}

	var favs []*models.Favorite

	res := db.Client.
		Where("user_id = ?", userId).
		Order("created_at DESC").
		Limit(256).
		Find(&favs)

	writeCache(userId, favs)

	return favs, res.Error
}
