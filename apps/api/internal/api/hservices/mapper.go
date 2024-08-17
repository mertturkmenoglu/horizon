package hservices

import (
	"encoding/json"
	"horizon/internal/db"
)

func mapHServicetoHServiceDto(v db.Hservice) (GetMyHServicesResponseDto, error) {
	var media map[string]any

	err := json.Unmarshal(v.Media, &media)

	if err != nil {
		return GetMyHServicesResponseDto{}, err
	}

	return GetMyHServicesResponseDto{
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
