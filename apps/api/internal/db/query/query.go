package query

import (
	"horizon/internal/api"
	"horizon/internal/db"

	"gorm.io/gorm/clause"
)

func FindById[T any](id string) (*T, error) {
	var entity *T

	res := db.Client.
		Preload(clause.Associations).
		First(&entity, "id = ?", id)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return nil, api.NewNotFoundError("Cannot found entity with id", id)
		}

		return nil, api.NewInternalServerError(res.Error.Error())
	}

	return entity, nil
}
