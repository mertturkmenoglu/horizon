package users

import (
	"context"
	"horizon/internal/db"
)

func (r *repository) getUserProfileByUsername(username string) (db.GetUserProfileByUsernameRow, error) {
	return r.db.Queries.GetUserProfileByUsername(context.Background(), username)
}
