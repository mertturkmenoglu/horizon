package services

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"strconv"
	"time"
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

func setNewServices(dtos []dto.GetServiceByIdResponse) error {
	return api.App.Cache.SetObj("new-services", dtos, time.Hour*12)
}

func getNewServices() ([]dto.GetServiceByIdResponse, error) {
	var services []dto.GetServiceByIdResponse
	err := api.App.Cache.ReadObj("new-services", &services)
	return services, err
}
