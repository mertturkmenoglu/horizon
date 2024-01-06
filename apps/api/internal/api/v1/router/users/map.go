package users

import (
	"horizon/internal/api/v1/dto"
	"horizon/internal/db/models"
)

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
		},
		Location: dto.UserLocationDto{
			City:    user.Location.City,
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
