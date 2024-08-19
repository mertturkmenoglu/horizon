package favorites

import (
	"encoding/json"
	"horizon/internal/db"
)

func mapFavoriteToFavoriteDto(v db.GetFavoritesByUserIdRow) (FavoritesResponseDto, error) {
	var media map[string]any

	err := json.Unmarshal(v.Hservice.Media, &media)

	if err != nil {
		return FavoritesResponseDto{}, err
	}

	val, _ := v.Favorite.ID.Value()

	var url *string = nil

	if v.Hservice.Url.Valid {
		url = &v.Hservice.Url.String
	}

	return FavoritesResponseDto{
		ID:         val.(string),
		UserID:     v.Favorite.UserID,
		HserviceID: v.Favorite.HserviceID,
		CreatedAt:  v.Favorite.CreatedAt.Time,
		HService: HServiceDto{
			ID:               v.Hservice.ID,
			UserID:           v.Hservice.UserID,
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
			CreatedAt:        &v.Hservice.CreatedAt.Time,
			UpdatedAt:        &v.Hservice.UpdatedAt.Time,
		},
	}, nil
}
