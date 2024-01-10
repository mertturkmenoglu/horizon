package users

import (
	"horizon/internal/api"
	"horizon/internal/db/models"
	"time"
)

func cacheDelete(username string) {
	_ = api.App.Cache.Del("user:" + username)
}

func cacheSetUser(user models.User) {
	key := "user:" + user.Username
	_ = api.App.Cache.SetObj(key, user, time.Minute*2)
}

func cacheGetUser(username string) (*models.User, error) {
	key := "user:" + username
	var u models.User
	err := api.App.Cache.ReadObj(key, &u)
	return &u, err
}
