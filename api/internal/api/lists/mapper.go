package lists

import (
	"encoding/json"
	"horizon/internal/db"
)

func mapGetMyListsResultToDto(v []db.List) []GetMyListsResponseDtoItem {
	res := make([]GetMyListsResponseDtoItem, 0)

	for _, row := range v {
		res = append(res, GetMyListsResponseDtoItem{
			ID:        row.ID,
			Title:     row.Title,
			UserID:    row.UserID,
			CreatedAt: row.CreatedAt.Time,
			UpdateAt:  row.UpdatedAt.Time,
		})
	}

	return res
}

func mapGetUsersListsResultToDto(v []db.GetUsersListsRow) []GetUsersListsResponseDtoItem {
	res := make([]GetUsersListsResponseDtoItem, 0)

	for _, row := range v {
		var gender *string = nil
		var profileImage *string = nil

		if row.User.Gender.Valid {
			gender = &row.User.Gender.String
		}

		if row.User.ProfileImage.Valid {
			profileImage = &row.User.ProfileImage.String
		}

		res = append(res, GetUsersListsResponseDtoItem{
			ID:     row.List.ID,
			Title:  row.List.Title,
			UserID: row.List.UserID,
			User: UserDto{
				ID:           row.List.UserID,
				Username:     row.User.Username,
				FullName:     row.User.FullName,
				Gender:       gender,
				ProfileImage: profileImage,
				CreatedAt:    row.User.CreatedAt.Time,
			},
			CreatedAt: row.List.CreatedAt.Time,
			UpdateAt:  row.List.UpdatedAt.Time,
		})
	}

	return res
}

func mapGetItemListInfoResultToDto(myLists []db.List, listItems []db.ListItem) []GetItemListInfoResponseDtoItem {
	res := make([]GetItemListInfoResponseDtoItem, 0)

	for _, list := range myLists {
		v := GetItemListInfoResponseDtoItem{
			ID:       list.ID,
			Title:    list.Title,
			Includes: false,
		}

		for _, item := range listItems {
			if item.ListID == list.ID {
				v.Includes = true
				break
			}
		}

		res = append(res, v)
	}

	return res
}

func mapGetListByIdResultToDto(list db.GetListByIdRow, listItems []db.GetListItemsByListIdRow) (GetListByIdResponseDto, error) {
	var gender *string = nil
	var profileImage *string = nil

	if list.User.Gender.Valid {
		gender = &list.User.Gender.String
	}

	if list.User.ProfileImage.Valid {
		profileImage = &list.User.ProfileImage.String
	}

	res := GetListByIdResponseDto{
		ID:        list.List.ID,
		Title:     list.List.Title,
		UserID:    list.List.UserID,
		CreatedAt: list.List.CreatedAt.Time,
		UpdateAt:  list.List.UpdatedAt.Time,
		User: UserDto{
			ID:           list.List.UserID,
			Username:     list.User.Username,
			FullName:     list.User.FullName,
			Gender:       gender,
			ProfileImage: profileImage,
			CreatedAt:    list.User.CreatedAt.Time,
		},
	}

	for _, item := range listItems {
		var url *string = nil

		if item.Hservice.Url.Valid {
			url = &item.Hservice.Url.String
		}

		var media map[string]any

		err := json.Unmarshal(item.Hservice.Media, &media)

		if err != nil {
			return GetListByIdResponseDto{}, err
		}

		var hserviceUserGender *string = nil
		var hserviceUserProfileImage *string = nil

		if item.User.Gender.Valid {
			hserviceUserGender = &item.User.Gender.String
		}

		if item.User.ProfileImage.Valid {
			hserviceUserProfileImage = &item.User.ProfileImage.String
		}

		res.Items = append(res.Items, ItemDto{
			ID:         item.ListItem.ID,
			ListId:     item.ListItem.ListID,
			HServiceId: item.ListItem.HserviceID,
			HService: HServiceDto{
				ID:     item.Hservice.ID,
				UserID: item.Hservice.UserID,
				User: UserDto{
					ID:           item.User.ID,
					Username:     item.User.Username,
					FullName:     item.User.FullName,
					Gender:       hserviceUserGender,
					ProfileImage: hserviceUserProfileImage,
					CreatedAt:    item.User.CreatedAt.Time,
				},
				Title:            item.Hservice.Title,
				Slug:             item.Hservice.Slug,
				Description:      item.Hservice.Description,
				Category:         item.Hservice.Category,
				Price:            item.Hservice.Price,
				PriceUnit:        string(item.Hservice.PriceUnit),
				PriceTimespan:    string(item.Hservice.PriceTimespan),
				IsOnline:         item.Hservice.IsOnline,
				Url:              url,
				Location:         item.Hservice.Location,
				DeliveryTime:     item.Hservice.DeliveryTime,
				DeliveryTimespan: string(item.Hservice.DeliveryTimespan),
				TotalPoints:      item.Hservice.TotalPoints,
				TotalVotes:       item.Hservice.TotalVotes,
				Media:            media,
				CreatedAt:        item.Hservice.CreatedAt.Time,
				UpdatedAt:        item.Hservice.UpdatedAt.Time,
			},
			ItemOrder: int(item.ListItem.ItemOrder),
		})
	}

	return res, nil
}

func mapCreateListResultToDto(v db.List) CreateListResponseDto {
	return CreateListResponseDto{
		ID:        v.ID,
		Title:     v.Title,
		UserID:    v.UserID,
		CreatedAt: v.CreatedAt.Time,
		UpdatedAt: v.UpdatedAt.Time,
	}
}

func mapCreateListItemResultToDto(v db.ListItem) CreateListItemResponseDto {
	return CreateListItemResponseDto{
		ID:         v.ID,
		ListId:     v.ListID,
		HserviceId: v.HserviceID,
		ItemOrder:  int(v.ItemOrder),
	}
}
