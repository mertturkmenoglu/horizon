package cache

import (
	"context"
	"encoding/json"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/spf13/viper"
)

var client *redis.Client
var redisContext = context.Background()

func newClient() *redis.Client {
	url := viper.GetString("redis.url")
	options, err := redis.ParseURL(url)

	if err != nil {
		panic(err)
	}

	return redis.NewClient(options)
}

func GetClient() *redis.Client {
	if client == nil {
		client = newClient()
	}

	return client
}

func Get(key string) (string, error) {
	return GetClient().Get(redisContext, key).Result()
}

func Set(key string, value string, exp time.Duration) error {
	return GetClient().Set(redisContext, key, value, exp).Err()
}

func Del(key string) error {
	return GetClient().Del(redisContext, key).Err()
}

func GetObj[T any](key string) (*T, error) {
	res, err := Get(key)

	if err != nil {
		return nil, err
	}

	var data *T

	err = json.Unmarshal([]byte(res), &data)

	if err != nil {
		return nil, err
	}

	return data, nil
}

func SetObj[T any](key string, data T, exp time.Duration) error {
	serialized, err := json.Marshal(data)

	if err != nil {
		return err
	}

	return Set(key, string(serialized), exp)
}
