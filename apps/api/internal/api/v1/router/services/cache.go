package services

import (
	"fmt"
	"horizon/internal/api"
	"strconv"
)

func fmtKey(id uint64) string {
	return fmt.Sprintf("service-visit:%d", id)
}

func incVisit(id uint64) {
	key := fmtKey(id)
	_ = api.App.Cache.IncrBy(key, 1)
	_ = api.App.Cache.IncrBy("total-service-visits", 1)
}

func getVisitCount(id uint64) uint64 {
	key := fmtKey(id)
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
