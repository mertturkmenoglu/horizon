package hservices

import (
	"horizon/internal/h"
	"horizon/internal/pagination"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Create HService godoc
//
//	@Summary		Create a new hservice
//	@Description	Creates a new hservice with the given title for the current user
//	@Tags			HServices
//	@Accept			json
//	@Produce		json
//	@Param			body	body	CreateHServiceRequestDto	true	"Request body"
//	@Success		201	{object}	h.R{data=HServiceWithoutUserResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/hservices [post]
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

	return c.JSON(http.StatusOK, h.R{
		Data: *res,
	})
}

// Get My HServices godoc
//
//	@Summary		Get my hservices
//	@Description	Gets all hservices for the current user
//	@Tags			HServices
//	@Accept			json
//	@Produce		json
//	@Param			page	query	int	false	"Page number"
//	@Param			pageSize	query	int	false	"Page size"
//	@Success		200	{object}	h.PR{data=[]HServiceWithoutUserResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/hservices [get]
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

	return c.JSON(http.StatusOK, h.PR{
		Data:       res,
		Pagination: *pagination,
	})
}

// Get HService by ID godoc
//
//	@Summary		Get hservice by ID
//	@Description	Gets a hservice with the given ID
//	@Tags			HServices
//	@Accept			json
//	@Produce		json
//	@Param			id	path	string	true	"HService ID"
//	@Success		200	{object}	h.MR{data=HServiceResponseDto,meta=HServiceMetadataDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Router			/hservices/{id} [get]
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

	return c.JSON(http.StatusOK, h.MR{
		Data: res,
		Meta: meta,
	})
}

// Get HServices by Username godoc
//
//	@Summary		Get hservices by username
//	@Description	Gets all hservices for the given username
//	@Tags			HServices
//	@Accept			json
//	@Produce		json
//	@Param			username	path	string	true	"Username"
//	@Param			page	query	int	false	"Page number"
//	@Param			pageSize	query	int	false	"Page size"
//	@Success		200	{object}	h.PR{data=[]HServiceResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Router			/hservices/user/{username} [get]
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

	return c.JSON(http.StatusOK, h.PR{
		Data:       res,
		Pagination: *pagination,
	})
}
