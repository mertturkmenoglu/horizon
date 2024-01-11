package services

import (
	"errors"
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/jsonwebtoken"
	"horizon/internal/pagination"

	"github.com/google/uuid"
	"github.com/gosimple/slug"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm/clause"
)

func getServiceById(id uint64) (*models.Service, error) {
	var service *models.Service

	res := db.Client.Preload(clause.Associations).First(&service, "id = ?", id)

	if res.Error != nil {
		if db.IsNotFoundError(res.Error) {
			return nil, api.NewNotFoundError("Cannot found service with id ", id)
		}

		return nil, api.NewInternalServerError(res.Error.Error())
	}

	return service, nil
}

func createService(c echo.Context) (uint64, error) {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	dto := c.Get("body").(dto.CreateServiceRequest)
	newId, flakeErr := api.App.Flake.NextID()
	userId, uuidErr := uuid.Parse(auth.UserId)
	err := errors.Join(flakeErr, uuidErr)

	if err != nil {
		return 0, api.NewInternalServerError(err.Error())
	}

	service := models.Service{
		Id:               newId,
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
		return 0, api.NewInternalServerError(err.Error())
	}

	return newId, nil
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
