package hservices

import (
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *handlers) CreateHService(c echo.Context) error {
	dto := c.Get("body").(CreateHServiceRequestDto)
	userId := c.Get("user_id").(string)

	err := s.service.createHServiceAdditionalValidations(dto)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, err := s.service.createHService(userId, dto)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[HServiceWithoutUserResponseDto]{
		Data: *res,
	})
}

func (s *handlers) GetMyHServices(c echo.Context) error {
	userId := c.Get("user_id").(string)
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res, pagination, err := s.service.getMyHServices(userId, params)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]HServiceWithoutUserResponseDto]{
		Data:       res,
		Pagination: *pagination,
	})
}

func (s *handlers) GetHServiceById(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired.Error())
	}

	res, err := s.service.getHServiceById(id)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	meta := s.service.getHServiceMetadata(id, userId)

	return c.JSON(http.StatusOK, h.MetadataResponse[HServiceResponseDto, HServiceMetadataDto]{
		Data: res,
		Meta: meta,
	})
}

func (s *handlers) GetHServicesByUsername(c echo.Context) error {
	username := c.Param("username")
	params, err := pagination.GetParamsFromContext(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errUsernameRequired.Error())
	}

	res, pagination, err := s.service.getHServicesByUsername(username, params)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.PaginatedResponse[[]HServiceResponseDto]{
		Data:       res,
		Pagination: *pagination,
	})
}
