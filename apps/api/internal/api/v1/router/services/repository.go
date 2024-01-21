package services

import (
	"context"
	"fmt"
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/models"
	"horizon/internal/pagination"

	"github.com/google/uuid"
	"github.com/gosimple/slug"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func getServiceById(id string) (*models.Service, error) {
	var service *models.Service

	res := db.Client.Preload(clause.Associations).First(&service, "id = ?", id)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return nil, api.NewNotFoundError("Cannot found service with id", id)
		}

		return nil, api.NewInternalServerError(res.Error.Error())
	}

	return service, nil
}

func createService(userId uuid.UUID, dto dto.CreateServiceRequest) (string, error) {
	newId, err := api.App.Flake.NextID()

	if err != nil {
		return "", api.NewInternalServerError(err.Error())
	}

	idstr := fmt.Sprintf("%d", newId)

	service := models.Service{
		Id:               idstr,
		UserId:           userId,
		Title:            dto.Title,
		Slug:             slug.Make(dto.Title),
		Description:      dto.Description,
		Category:         dto.Category,
		Price:            dto.Price,
		PriceUnit:        dto.PriceUnit,
		PriceTimespan:    dto.PriceTimespan,
		IsOnline:         dto.IsOnline,
		Location:         dto.Location,
		DeliveryTime:     dto.DeliveryTime,
		DeliveryTimespan: dto.DeliveryTimespan,
		Status:           0,
	}

	res := db.Client.Create(&service)

	if res.Error != nil {
		return "", api.NewInternalServerError(err.Error())
	}

	srv, _ := getServiceById(idstr)
	serviceDto := mapModelToGetServiceByIdResponse(srv, 0, 0)
	api.App.Search.
		Client.
		Index("service").
		Id(idstr).
		Request(serviceDto).
		Do(context.TODO())

	return idstr, nil
}

func getServices(c echo.Context) ([]*models.Service, error) {
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return nil, api.NewBadRequestError(err.Error())
	}

	var services []*models.Service
	var count int64

	res := db.Client.
		Preload(clause.Associations).
		Order("created_at DESC").
		Limit(params.PageSize).
		Offset(params.Offset).
		Find(&services)

	if res.Error != nil {
		return nil, api.NewBadRequestError()
	}

	res = db.Client.Table("services").Count(&count)

	if res.Error != nil {
		return nil, api.NewBadRequestError()
	}

	return services, nil
}

func getServiceRating(userId string, serviceId string) (*models.ServiceReview, error) {
	var rating *models.ServiceReview

	res := db.Client.Preload(clause.Associations).First(&rating, "user_id = ? AND service_id = ?", userId, serviceId)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return nil, api.NewNotFoundError("Cannot found rating")
		}

		return nil, api.NewInternalServerError(res.Error.Error())
	}

	return rating, nil
}

func upsertRate(userId string, serviceId string, rating uint8) error {
	res := db.Client.Transaction(func(tx *gorm.DB) error {
		service, err := getServiceById(serviceId)

		if err != nil {
			return err
		}

		r, err := getServiceRating(userId, serviceId)

		if err != nil {
			// Create
			res := tx.Create(&models.ServiceReview{
				UserId:    uuid.MustParse(userId),
				ServiceId: serviceId,
				Point:     rating,
			})

			if res.Error != nil {
				return api.NewInternalServerError("cannot create rating")
			}
		} else {
			// Update
			res := tx.Model(&models.ServiceReview{}).
				Where("user_id = ? AND service_id = ?", userId, serviceId).
				Updates(map[string]interface{}{
					"point": rating,
				})

			if res.Error != nil {
				return api.NewInternalServerError("cannot create rating")
			}
		}

		var newPoint uint64 = 0
		var totalVotes uint64 = 0

		hasAlreadyVoted := err == nil

		if hasAlreadyVoted {
			newPoint = service.TotalPoints - uint64(r.Point) + uint64(rating)
			totalVotes = service.TotalVotes
		} else {
			newPoint = service.TotalPoints + uint64(rating)
			totalVotes = service.TotalVotes + 1
		}

		res := tx.Model(&models.Service{}).
			Where("id = ?", serviceId).
			Updates(map[string]interface{}{
				"total_votes":  totalVotes,
				"total_points": newPoint,
			})

		if res.Error != nil {
			return api.NewInternalServerError("cannot create rating")
		}

		return nil
	})

	return res
}

func deleteRate(userId string, serviceId string) error {
	res := db.Client.Transaction(func(tx *gorm.DB) error {
		service, err := getServiceById(serviceId)

		if err != nil {
			return err
		}

		rating, err := getServiceRating(userId, serviceId)

		if err != nil {
			return err
		}

		res := tx.Where("user_id = ?", userId).Where("service_id = ?", serviceId).Delete(&models.ServiceReview{})

		if res.Error != nil {
			return api.NewInternalServerError("cannot delete rating")
		}

		res = tx.Model(&models.Service{}).
			Where("id = ?", serviceId).
			Updates(map[string]interface{}{
				"total_votes":  service.TotalVotes - 1,
				"total_points": service.TotalPoints - uint64(rating.Point),
			})

		if res.Error != nil {
			return api.NewInternalServerError("cannot delete rating")
		}

		return nil
	})

	return res
}

func getServicesByUsername(username string, params pagination.Params) ([]*models.Service, int64, error) {
	var services []*models.Service
	var count int64
	var user *models.User

	res := db.Client.First(&user, "username = ?", username)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return nil, 0, api.NewNotFoundError("Cannot found user with username " + username)
		}

		return nil, 0, api.NewInternalServerError(res.Error.Error())
	}

	res = db.Client.
		Preload(clause.Associations).
		Order("created_at DESC").
		Limit(params.PageSize).
		Offset(params.Offset).
		Find(&services, "user_id = ?", user.Id)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return nil, 0, api.NewNotFoundError("Cannot found services")
		}

		return nil, 0, api.NewInternalServerError(res.Error.Error())
	}

	res = db.Client.Table("services").Where("user_id = ?", user.Id).Count(&count)

	if res.Error != nil {
		return nil, 0, api.NewBadRequestError()
	}

	return services, count, nil
}
