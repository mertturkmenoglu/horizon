package services

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/db/models"
)

func mapPhotos(models []models.ServicePhoto) []dto.ServicePhotoDto {
	photos := make([]dto.ServicePhotoDto, len(models))

	for i := 0; i < len(models); i++ {
		photos[i] = dto.ServicePhotoDto{
			ServiceId: models[i].ServiceId,
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
			ServiceId: models[i].ServiceId,
			Url:       models[i].Url,
			Alt:       models[i].Alt,
		}
	}

	return videos
}

func mapModelToGetServiceByIdResponse(service *models.Service) dto.GetServiceByIdResponse {
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
		Photos:           mapPhotos(service.Photos),
		Videos:           mapVideos(service.Videos),
	}
}
