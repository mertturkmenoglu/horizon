package aggregations

import (
	"context"
	"horizon/internal/db"
)

func (r *repository) getNewHServices() ([]db.GetNewHServicesRow, error) {
	return r.db.Queries.GetNewHServices(context.Background())
}

func (r *repository) getPopularHServices() ([]db.GetPopularHServicesRow, error) {
	return r.db.Queries.GetPopularHServices(context.Background())
}

func (r *repository) getFeaturedHServices() ([]db.GetFeaturedHServicesRow, error) {
	return r.db.Queries.GetFeaturedHServices(context.Background())
}

func (r *repository) getFavoriteHServices() ([]db.GetFavoriteHServicesRow, error) {
	return r.db.Queries.GetFavoriteHServices(context.Background())
}
