package favorites

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/models"
)

func mapModelToDto(fav *models.Favorite) dto.FavoriteDto {
	return dto.FavoriteDto{
		Id:        fav.Id.String(),
		ServiceId: fav.ServiceId,
		UserId:    fav.UserId,
	}
}

func mapModeltoDtoArr(favs []*models.Favorite) []dto.FavoriteDto {
	dtos := make([]dto.FavoriteDto, len(favs))

	for i, f := range favs {
		dtos[i] = dto.FavoriteDto{
			Id:        f.Id.String(),
			ServiceId: f.ServiceId,
			UserId:    f.UserId,
		}
	}

	return dtos
}
