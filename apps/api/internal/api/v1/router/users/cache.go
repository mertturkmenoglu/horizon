package users

import (
	"horizon/internal/cache"
	"horizon/internal/db/models"
	"time"
)

func cacheDelete(username string) {
	_ = cache.Del("user:" + username)
}

func cacheSetUser(user models.User) {
	key := "user:" + user.Username
	_ = cache.SetObj[models.User](key, user, time.Minute*2)
}

func cacheGetUser(username string) (*models.User, error) {
	key := "user:" + username
	return cache.GetObj[models.User](key)
}
