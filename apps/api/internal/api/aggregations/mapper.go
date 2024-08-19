package aggregations

import (
	"encoding/json"
	"horizon/internal/db"
)

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
		Title:            v.Hservice.ID,
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

func mapNewHServicesToDtos(hservices []db.GetNewHServicesRow) ([]HServiceResponseDto, error) {
	dtos := make([]HServiceResponseDto, 0)

	for _, row := range hservices {
		dto, err := mapRowToDto(Row{Hservice: row.Hservice, User: row.User})

		if err != nil {
			return nil, err
		}

		dtos = append(dtos, dto)
	}

	return dtos, nil
}

func mapPopularHServicesToDtos(hservices []db.GetPopularHServicesRow) ([]HServiceResponseDto, error) {
	dtos := make([]HServiceResponseDto, 0)

	for _, row := range hservices {
		dto, err := mapRowToDto(Row{Hservice: row.Hservice, User: row.User})

		if err != nil {
			return nil, err
		}

		dtos = append(dtos, dto)
	}

	return dtos, nil
}

func mapFeaturedHServicesToDtos(hservices []db.GetFeaturedHServicesRow) ([]HServiceResponseDto, error) {
	dtos := make([]HServiceResponseDto, 0)

	for _, row := range hservices {
		dto, err := mapRowToDto(Row{Hservice: row.Hservice, User: row.User})

		if err != nil {
			return nil, err
		}

		dtos = append(dtos, dto)
	}

	return dtos, nil
}

func mapFavoriteHServicesToDtos(hservices []db.GetFavoriteHServicesRow) ([]HServiceResponseDto, error) {
	dtos := make([]HServiceResponseDto, 0)

	for _, row := range hservices {
		dto, err := mapRowToDto(Row{Hservice: row.Hservice, User: row.User})

		if err != nil {
			return nil, err
		}

		dtos = append(dtos, dto)
	}

	return dtos, nil
}
