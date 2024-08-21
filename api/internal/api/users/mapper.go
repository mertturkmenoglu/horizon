package users

import "horizon/internal/db"

func mapGetUserProfileByUsernameRowToDto(v db.GetUserProfileByUsernameRow) GetUserProfileByUsernameResponseDto {
	return GetUserProfileByUsernameResponseDto{
		ID:           v.ID,
		Username:     v.Username,
		FullName:     v.FullName,
		Gender:       v.Gender,
		ProfileImage: v.ProfileImage,
		CreatedAt:    v.CreatedAt,
	}
}
