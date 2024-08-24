package reviews

import (
	"encoding/json"
	"horizon/internal/db"
)

type Row struct {
	Review   db.Review
	User     db.User
	Hservice db.Hservice
}

func mapOneRow(row Row) (ReviewItemDto, error) {
	var media map[string]any

	err := json.Unmarshal(row.Review.Media, &media)

	if err != nil {
		return ReviewItemDto{}, err
	}

	var profileImage *string = nil

	if row.User.ProfileImage.Valid {
		profileImage = &row.User.ProfileImage.String
	}

	var gender *string = nil

	if row.User.Gender.Valid {
		gender = &row.User.Gender.String
	}

	var url *string = nil

	if row.Hservice.Url.Valid {
		url = &row.Hservice.Url.String
	}

	var hserviceMedia map[string]any

	err = json.Unmarshal(row.Hservice.Media, &hserviceMedia)

	if err != nil {
		return ReviewItemDto{}, err
	}

	dto := ReviewItemDto{
		ID:     row.Review.ID,
		UserID: row.Review.UserID,
		User: UserDto{
			ID:           row.User.ID,
			Username:     row.User.Username,
			FullName:     row.User.FullName,
			Gender:       gender,
			ProfileImage: profileImage,
			CreatedAt:    row.User.CreatedAt.Time,
		},
		HServiceID: row.Hservice.ID,
		HService: HServiceDto{
			ID:               row.Hservice.ID,
			UserID:           row.Hservice.UserID,
			Title:            row.Hservice.Title,
			Slug:             row.Hservice.Slug,
			Description:      row.Hservice.Description,
			Category:         row.Hservice.Category,
			Price:            row.Hservice.Price,
			PriceUnit:        string(row.Hservice.PriceUnit),
			PriceTimespan:    string(row.Hservice.PriceTimespan),
			IsOnline:         row.Hservice.IsOnline,
			Url:              url,
			Location:         row.Hservice.Location,
			DeliveryTime:     row.Hservice.DeliveryTime,
			DeliveryTimespan: string(row.Hservice.DeliveryTimespan),
			TotalPoints:      row.Hservice.TotalPoints,
			TotalVotes:       row.Hservice.TotalVotes,
			Media:            hserviceMedia,
			CreatedAt:        row.Hservice.CreatedAt.Time,
			UpdatedAt:        row.Hservice.UpdatedAt.Time,
		},
		Rating:       row.Review.Rating,
		Comment:      row.Review.Comment,
		Media:        media,
		LikeCount:    row.Review.LikeCount,
		DislikeCount: row.Review.DislikeCount,
		CreatedAt:    row.Review.CreatedAt.Time,
		UpdatedAt:    row.Review.UpdatedAt.Time,
	}

	return dto, nil
}

func mapGetReviewsByHServiceIdToDto(v []db.GetReviewsByHServiceIdRow) (GetReviewsByHServiceIdResponseDto, error) {
	res := make([]ReviewItemDto, 0)

	for _, row := range v {
		dto, err := mapOneRow(Row{
			Review:   row.Review,
			User:     row.User,
			Hservice: row.Hservice,
		})

		if err != nil {
			return nil, err
		}

		res = append(res, dto)
	}

	return res, nil
}

func mapGetReviewsByUsernameToDto(v []db.GetReviewsByUsernameRow) (GetReviewsByUsernameResponseDto, error) {
	res := make([]ReviewItemDto, 0)

	for _, row := range v {
		dto, err := mapOneRow(Row{
			Review:   row.Review,
			User:     row.User,
			Hservice: row.Hservice,
		})

		if err != nil {
			return nil, err
		}

		res = append(res, dto)
	}

	return res, nil
}

func mapGetReviewByIdToDto(v db.GetReviewByIdRow) (ReviewItemDto, error) {
	dto, err := mapOneRow(Row{
		Review:   v.Review,
		User:     v.User,
		Hservice: v.Hservice,
	})

	return dto, err
}
