package services

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	categories "horizon/internal/category"
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/db/query"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func GetServiceCategories(c echo.Context) error {
	return c.JSON(http.StatusOK, h.Response[dto.GetServiceCategoriesRespose]{
		"data": categories.ServiceCategories,
	})
}

func GetServices(c echo.Context) error {
	services, err := getServices(c)

	if err != nil {
		return err
	}

	dtos := make([]dto.GetServiceByIdResponse, len(services))
	totalVisits := getTotalVisitsCount()

	for i, s := range services {
		dtos[i] = mapModelToGetServiceByIdResponse(s, getVisitCount(s.Id), totalVisits)
	}

	return c.JSON(http.StatusOK, h.Response[[]dto.GetServiceByIdResponse]{
		"data": dtos,
	})
}

func GetServiceById(c echo.Context) error {
	id := c.Param("id")

	service, err := getServiceById(id)

	if err != nil {
		return err
	}

	defer incVisit(id)

	return c.JSON(http.StatusOK, h.Response[dto.GetServiceByIdResponse]{
		"data": mapModelToGetServiceByIdResponse(service, getVisitCount(id), getTotalVisitsCount()),
	})
}

func CreateService(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	dto := c.Get("body").(dto.CreateServiceRequest)

	id, err := createService(uuid.MustParse(auth.UserId), dto)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, h.Response[any]{
		"data": id,
	})
}

func UploadServiceMedia(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	id := c.Param("id")

	if id == "" {
		return api.NewBadRequestError("service id is required")
	}

	service, err := getServiceById(id)

	if err != nil {
		return err
	}

	if service.User.Id.String() != auth.UserId {
		return api.NewForbiddenError()
	}

	form, err := c.MultipartForm()

	if err != nil {
		return err
	}

	files := form.File["files"]

	if len(files) > 10 {
		return api.NewBadRequestError("max media count is exceeded")
	}

	for _, file := range files {
		err := checkFile(file)

		if err != nil {
			return err
		}
	}

	for _, file := range files {
		src, err := file.Open()

		if err != nil {
			return err
		}

		defer src.Close()

		ct := file.Header.Get("Content-Type")

		info, err := putFile(ct, src)

		if err != nil {
			return api.NewInternalServerError(err)
		}

		isVideo := ct == "video/mp4"

		if isVideo {
			v := models.ServiceVideo{
				ServiceId:  id,
				StorageKey: info.Key,
				Url:        info.Location,
				Alt:        "",
			}

			res := db.Client.Create(&v)

			if res.Error != nil {
				return api.NewInternalServerError(res.Error)
			}
		} else {
			p := models.ServicePhoto{
				ServiceId:  id,
				StorageKey: info.Key,
				Url:        info.Location,
				Alt:        "",
			}

			res := db.Client.Create(&p)

			if res.Error != nil {
				return api.NewInternalServerError(res.Error)
			}
		}
	}

	return c.NoContent(http.StatusCreated)
}

func DeleteServiceMedia(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	id := c.Param("id")
	mediaId := c.Param("mediaId")

	if id == "" {
		return api.NewBadRequestError("service id is required")
	}

	service, err := getServiceById(id)

	if err != nil {
		return err
	}

	if service.User.Id.String() != auth.UserId {
		return api.NewForbiddenError()
	}

	photo, photoErr := query.FindById[models.ServicePhoto](mediaId)
	video, videoErr := query.FindById[models.ServiceVideo](mediaId)

	if photoErr != nil && videoErr != nil {
		return api.NewNotFoundError("Cannot found media with id " + mediaId)
	}

	if photo != nil && photo.ServiceId != id {
		return api.NewBadRequestError("Media is not related to the service")
	}

	if video != nil && video.ServiceId != id {
		return api.NewBadRequestError("Media is not related to the service")
	}

	if photo != nil {
		res := db.Client.Delete(photo)

		if res.Error != nil {
			return api.NewInternalServerError(res.Error)
		}

		err := removeFile(photo.StorageKey)

		if err != nil {
			return api.NewInternalServerError(err)
		}
	} else {
		res := db.Client.Delete(video)

		if res.Error != nil {
			return api.NewInternalServerError(res.Error)
		}

		err := removeFile(video.StorageKey)

		if err != nil {
			return api.NewInternalServerError(err)
		}
	}

	return c.NoContent(http.StatusNoContent)
}

func BulkCreateServices(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	dtos := c.Get("body").(dto.BulkCreateServicesRequest)
	userId := uuid.MustParse(auth.UserId)
	ids := make([]string, len(dtos.Data))

	for i, dto := range dtos.Data {
		id, err := createService(userId, dto)
		ids[i] = id

		if err != nil {
			return err
		}
	}

	return c.JSON(http.StatusCreated, h.Response[[]string]{
		"data": ids,
	})
}

func CreateRating(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	id := c.Param("id")
	ratestr := c.Param("rating")

	rate, err := strconv.ParseUint(ratestr, 10, 8)

	if err != nil || rate <= 0 || rate > 5 {
		return api.NewBadRequestError("Invalid rating")
	}

	err = upsertRate(auth.UserId, id, uint8(rate))

	if err != nil {
		return err
	}

	return c.NoContent(http.StatusOK)
}

func DeleteRating(c echo.Context) error {
	auth := c.Get("auth").(jsonwebtoken.Payload)
	id := c.Param("id")

	err := deleteRate(auth.UserId, id)

	if err != nil {
		return err
	}

	return c.NoContent(http.StatusOK)
}

func GetNewServices(c echo.Context) error {
	newServices, err := getNewServices()

	if err == nil {
		return c.JSON(http.StatusOK, h.Response[[]dto.GetServiceByIdResponse]{
			"data": newServices,
		})
	}

	services, err := getServices(c)

	if err != nil {
		return api.NewBadRequestError(err)
	}

	dtos := make([]dto.GetServiceByIdResponse, len(services))
	totalVisits := getTotalVisitsCount()

	for i, s := range services {
		dtos[i] = mapModelToGetServiceByIdResponse(s, getVisitCount(s.Id), totalVisits)
	}

	_ = setNewServices(dtos)

	return c.JSON(http.StatusOK, h.Response[[]dto.GetServiceByIdResponse]{
		"data": dtos,
	})
}

func GetCategoriesServiceCount(c echo.Context) error {
	var result []dto.GetCategoriesServiceCountResponse
	err := api.App.Cache.ReadObj("category-service-count", &result)

	if err != nil {
		return api.NewInternalServerError(err)
	}

	return c.JSON(http.StatusOK, h.Response[[]dto.GetCategoriesServiceCountResponse]{
		"data": result,
	})
}
