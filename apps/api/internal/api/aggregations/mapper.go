package aggregations

import (
	"encoding/json"
	"horizon/internal/db"
)

func mapHServiceToHServiceDto(v db.Hservice) (HServiceResponseDto, error) {
	var media map[string]any

	err := json.Unmarshal(v.Media, &media)

	if err != nil {
		return HServiceResponseDto{}, err
	}

	return HServiceResponseDto{
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
		Url:              v.Url,
		Location:         v.Location,
		DeliveryTime:     v.DeliveryTime,
		DeliveryTimespan: string(v.DeliveryTimespan),
		TotalPoints:      v.TotalPoints,
		TotalVotes:       v.TotalVotes,
		Media:            media,
		CreatedAt:        v.CreatedAt,
		UpdatedAt:        v.UpdatedAt,
	}, nil
}

func mapHServicesToHServiceDtos(hservices []db.Hservice) ([]HServiceResponseDto, error) {
	dtos := make([]HServiceResponseDto, 0)

	for _, hservice := range hservices {
		dto, err := mapHServiceToHServiceDto(hservice)

		if err != nil {
			return nil, err
		}

		dtos = append(dtos, dto)
	}

	return dtos, nil
}
