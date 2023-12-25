package cache

import (
	"context"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

var client *redis.Client
var redisContext = context.Background()

func newClient() *redis.Client {
	url := os.Getenv("REDIS_URL")
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
