package users

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/db/models"

	"gorm.io/datatypes"
)

func mapLinks(links datatypes.JSONSlice[models.ContactLink]) []dto.ContactLinkDto {
	res := make([]dto.ContactLinkDto, 0)
	for _, l := range links {
		res = append(res, dto.ContactLinkDto{
			Name:  l.Name,
			Value: l.Value,
		})
	}
	return res
}

func mapModelToGetUserByUsernameResponse(user *models.User) dto.GetUserByUsernameResponse {
	return dto.GetUserByUsernameResponse{
		Id:       user.Id.String(),
		Name:     user.Name,
		Email:    user.Email,
		Username: user.Username,
		Gender:   user.Gender,
		ContactInformation: dto.UserContactInformationDto{
			Email:   user.ContactInformation.Email,
			Phone:   user.ContactInformation.Phone,
			Address: user.ContactInformation.Address,
			Other:   user.ContactInformation.Other,
			Links:   mapLinks(user.ContactInformation.Links),
		},
		Location: dto.UserLocationDto{
			City:    user.Location.City,
			Admin:   user.Location.Admin,
			Country: user.Location.Country,
			Lat:     user.Location.Lat,
			Long:    user.Location.Long,
		},
		IsBusinessAccount: user.IsBusinessAccount,
		IsVerifiedAccount: user.IsVerifiedAccount,
		Description:       user.Description,
		AccountStatus:     user.AccountStatus,
		ProfileImage:      user.ProfileImage,
	}
}
