package users

import "github.com/jackc/pgx/v5/pgtype"

type GetUserProfileByUsernameResponseDto struct {
	ID           string             `json:"id"`
	Username     string             `json:"username"`
	FullName     string             `json:"fullName"`
	Gender       pgtype.Text        `json:"gender"`
	ProfileImage pgtype.Text        `json:"profileImage"`
	CreatedAt    pgtype.Timestamptz `json:"createdAt"`
}
