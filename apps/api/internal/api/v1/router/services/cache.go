package services

import (
	"horizon/internal/api"
	"strconv"
)

func incVisit(id string) {
	key := "service-visit" + id
	_ = api.App.Cache.IncrBy(key, 1)
	_ = api.App.Cache.IncrBy("total-service-visits", 1)
}

func getVisitCount(id string) uint64 {
	key := "service-visit" + id
	v, err := api.App.Cache.Get(key)

	if err != nil {
		return 0
	}

	count, err := strconv.ParseUint(v, 10, 64)

	if err != nil {
		return 0
	}

	return count
}

func getTotalVisitsCount() uint64 {
	v, err := api.App.Cache.Get("total-service-visits")

	if err != nil {
		return 0
	}

	count, err := strconv.ParseUint(v, 10, 64)

	if err != nil {
		return 0
	}

	return count
}
