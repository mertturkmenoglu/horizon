package hservices

import (
	"encoding/json"
	"horizon/internal/db"
)

func mapHServiceToWithoutUserDto(v db.Hservice) (HServiceWithoutUserResponseDto, error) {
	var media map[string]any

	err := json.Unmarshal(v.Media, &media)

	if err != nil {
		return HServiceWithoutUserResponseDto{}, err
	}

	var url *string

	if v.Url.Valid {
		url = &v.Url.String
	}

	return HServiceWithoutUserResponseDto{
		ID:               v.ID,
		UserID:           v.UserID,
		Title:            v.Title,
		Slug:             v.Slug,
		Description:      v.Description,
		Category:         v.Category,
		Price:            v.Price,
		PriceUnit:        string(v.PriceUnit),
		PriceTimespan:    string(v.PriceTimespan),
		IsOnline:         v.IsOnline,
		Url:              url,
		Location:         v.Location,
		DeliveryTime:     v.DeliveryTime,
		DeliveryTimespan: string(v.DeliveryTimespan),
		TotalPoints:      v.TotalPoints,
		TotalVotes:       v.TotalVotes,
		Media:            media,
		CreatedAt:        v.CreatedAt.Time,
		UpdatedAt:        v.UpdatedAt.Time,
	}, nil
}

type Row struct {
	Hservice db.Hservice
	User     db.User
}

func mapRowToDto(v Row) (HServiceResponseDto, error) {
	var media map[string]any

	err := json.Unmarshal(v.Hservice.Media, &media)

	if err != nil {
		return HServiceResponseDto{}, err
	}

	var url *string

	if v.Hservice.Url.Valid {
		url = &v.Hservice.Url.String
	}

	var gender *string

	if v.User.Gender.Valid {
		gender = &v.User.Gender.String
	}

	var profileImage *string

	if v.User.ProfileImage.Valid {
		profileImage = &v.User.ProfileImage.String
	}

	return HServiceResponseDto{
		ID:     v.Hservice.ID,
		UserID: v.Hservice.UserID,
		User: UserResponseDto{
			ID:           v.User.ID,
			Username:     v.User.Username,
			FullName:     v.User.FullName,
			Gender:       gender,
			ProfileImage: profileImage,
			CreatedAt:    v.User.CreatedAt.Time,
		},
		Title:            v.Hservice.Title,
		Slug:             v.Hservice.Slug,
		Description:      v.Hservice.Description,
		Category:         v.Hservice.Category,
		Price:            v.Hservice.Price,
		PriceUnit:        string(v.Hservice.PriceUnit),
		PriceTimespan:    string(v.Hservice.PriceTimespan),
		IsOnline:         v.Hservice.IsOnline,
		Url:              url,
		Location:         v.Hservice.Location,
		DeliveryTime:     v.Hservice.DeliveryTime,
		DeliveryTimespan: string(v.Hservice.DeliveryTimespan),
		TotalPoints:      v.Hservice.TotalPoints,
		TotalVotes:       v.Hservice.TotalVotes,
		Media:            media,
		CreatedAt:        v.Hservice.CreatedAt.Time,
		UpdatedAt:        v.Hservice.UpdatedAt.Time,
	}, nil
}
