package services

import (
	"horizon/internal/api/v1/dto"
	categories "horizon/internal/category"
	"horizon/internal/h"
	"net/http"

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
	return echo.NewHTTPError(http.StatusNotImplemented)
}

func DeleteRating(c echo.Context) error {
	return echo.NewHTTPError(http.StatusNotImplemented)
}
