package services

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/models"
	"time"
)

func mapPhotos(models []models.ServicePhoto) []dto.ServicePhotoDto {
	photos := make([]dto.ServicePhotoDto, len(models))

	for i := 0; i < len(models); i++ {
		photos[i] = dto.ServicePhotoDto{
			Id:        models[i].Id.String(),
			ServiceId: models[i].ServiceId,
			Key:       models[i].StorageKey,
			Url:       models[i].Url,
			Alt:       models[i].Alt,
		}
	}

	return photos
}

func mapVideos(models []models.ServiceVideo) []dto.ServiceVideoDto {
	videos := make([]dto.ServiceVideoDto, len(models))

	for i := 0; i < len(models); i++ {
		videos[i] = dto.ServiceVideoDto{
			Id:        models[i].Id.String(),
			ServiceId: models[i].ServiceId,
			Key:       models[i].StorageKey,
			Url:       models[i].Url,
			Alt:       models[i].Alt,
		}
	}

	return videos
}

func isNew(createdAt time.Time) bool {
	diff := time.Now().Sub(createdAt)
	week := time.Hour * 24 * 7.0
	return diff.Hours() < week.Hours()
}

func isPopular(visits uint64, totalVisits uint64) bool {
	if totalVisits == 0 {
		return false
	}

	ratio := float64(visits) / float64(totalVisits)
	return ratio > 0.0001
}

func mapModelToGetServiceByIdResponse(service *models.Service, visits uint64, totalVisits uint64) dto.GetServiceByIdResponse {
	return dto.GetServiceByIdResponse{
		Id:        service.Id,
		CreatedAt: service.CreatedAt,
		UpdatedAt: service.UpdatedAt,
		User: dto.ServiceUserDto{
			Id:                service.User.Id.String(),
			Name:              service.User.Name,
			Username:          service.User.Username,
			IsBusinessAccount: service.User.IsBusinessAccount,
			IsVerifiedAccount: service.User.IsVerifiedAccount,
			AccountStatus:     service.User.AccountStatus,
			ProfileImage:      service.User.ProfileImage,
		},
		Title:            service.Title,
		Slug:             service.Slug,
		Description:      service.Description,
		Category:         service.Category,
		Price:            service.Price,
		PriceUnit:        service.PriceUnit,
		PriceTimespan:    service.PriceTimespan,
		IsOnline:         service.IsOnline,
		Location:         service.Location,
		DeliveryTime:     service.DeliveryTime,
		DeliveryTimespan: service.DeliveryTimespan,
		Status:           service.Status,
		Visits:           visits,
		TotalPoints:      service.TotalPoints,
		TotalVotes:       service.TotalVotes,
		IsNew:            isNew(service.CreatedAt),
		IsPopular:        isPopular(visits, totalVisits),
		Photos:           mapPhotos(service.Photos),
		Videos:           mapVideos(service.Videos),
	}
}
