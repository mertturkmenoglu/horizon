package services

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	categories "horizon/internal/category"
	"horizon/internal/h"
	"horizon/internal/jsonwebtoken"
	"net/http"
	"strconv"

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
	id, err := createService(c)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, h.Response[any]{
		"data": id,
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
