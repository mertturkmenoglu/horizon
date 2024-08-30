package users

import "horizon/internal/db"

func mapGetUserProfileByUsernameRowToDto(v db.GetUserProfileByUsernameRow) GetUserProfileByUsernameResponseDto {
	var gender *string = nil
	var profileImage *string = nil

	if v.Gender.Valid {
		gender = &v.Gender.String
	}

	if v.ProfileImage.Valid {
		profileImage = &v.ProfileImage.String
	}

	return GetUserProfileByUsernameResponseDto{
		ID:           v.ID,
		Username:     v.Username,
		FullName:     v.FullName,
		Gender:       gender,
		ProfileImage: profileImage,
		CreatedAt:    v.CreatedAt.Time,
	}
}
