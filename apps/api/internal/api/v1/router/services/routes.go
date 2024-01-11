package services

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	categories "horizon/internal/category"
	"horizon/internal/h"
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
	idstr := c.Param("id")
	id, err := strconv.ParseUint(idstr, 10, 64)

	if err != nil {
		return api.NewBadRequestError("Invalid id")
	}

	service, err := getServiceById(id)

	if err != nil {
		return nil
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
