package lists

import (
	"errors"
	"horizon/internal/h"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

func (s *handlers) GetMyLists(c echo.Context) error {
	userId := c.Get("user_id").(string)

	res, err := s.service.getMyLists(userId)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.Response[GetMyListsResponseDto]{
		Data: res,
	})
}

func (s *handlers) GetUsersLists(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errUsernameRequired.Error())
	}

	res, err := s.service.getUsersLists(username)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.Response[GetUsersListsResponseDto]{
		Data: res,
	})
}

func (s *handlers) GetItemListInfo(c echo.Context) error {
	userId := c.Get("user_id").(string)
	hserviceId := c.Param("hservice_id")

	if hserviceId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errHServiceIdRequired.Error())
	}

	res, err := s.service.getItemListInfo(userId, hserviceId)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusOK, h.Response[GetItemListInfoResponseDto]{
				Data: []GetItemListInfoResponseDtoItem{},
			})
		}

		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[GetItemListInfoResponseDto]{
		Data: res,
	})
}

func (s *handlers) GetListById(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired.Error())
	}

	res, err := s.service.getListById(id)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.Response[GetListByIdResponseDto]{
		Data: res,
	})
}

func (s *handlers) CreateList(c echo.Context) error {
	userId := c.Get("user_id").(string)
	dto := c.Get("body").(CreateListRequestDto)

	ok := s.service.checkIfUserIsAllowedToCreateList(userId)

	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, errMaxListReached.Error())
	}

	res, err := s.service.createList(userId, dto)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusCreated, h.Response[CreateListResponseDto]{
		Data: res,
	})
}

func (s *handlers) CreateListItem(c echo.Context) error {
	dto := c.Get("body").(CreateListItemRequestDto)

	ok := s.service.checkIfUserIsAllowedToCreateListItem(dto.ListId)

	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, errMaxListItemReached.Error())
	}

	res, err := s.service.createListItem(dto)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusCreated, h.Response[CreateListItemResponseDto]{
		Data: res,
	})
}

func (s *handlers) DeleteList(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired.Error())
	}

	err := s.service.deleteList(userId, id)

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}

func (s *handlers) DeleteListItem(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired.Error())
	}

	err := s.service.deleteListItem(userId, id)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.NoContent(http.StatusNoContent)
}

func (s *handlers) MoveListItemAfter(c echo.Context) error {
	userId := c.Get("user_id").(string)
	listId := c.Param("list_id")
	itemId := c.Param("item_id")
	afterItemId := c.Param("after_item_id")

	err := s.service.checkMoveListItemParams(listId, itemId, afterItemId)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	list, err := s.service.getListById(listId)

	if err != nil {
		return echo.ErrBadRequest
	}

	if list.UserID != userId {
		return echo.NewHTTPError(http.StatusForbidden, errUnauthorizedMoveListItem.Error())
	}

	listItem, err := s.service.getListItemById(itemId, listId)

	if err != nil {
		return echo.ErrBadRequest
	}

	afterItem, err := s.service.getListItemById(afterItemId, listId)

	if err != nil {
		return echo.ErrBadRequest
	}

	err = s.service.moveListItemAfter(listId, listItem, afterItem)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusNoContent)
}
