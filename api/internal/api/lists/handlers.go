package lists

import (
	"errors"
	"horizon/internal/h"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

// Get My Lists godoc
//
//	@Summary		Get my lists
//	@Description	Gets all lists for the current user
//	@Tags			Lists
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	h.R{data=GetMyListsResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/lists [get]
func (s *handlers) GetMyLists(c echo.Context) error {
	userId := c.Get("user_id").(string)

	res, err := s.service.getMyLists(userId)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.R{
		Data: res,
	})
}

// Get Users Lists godoc
//
//	@Summary		Get lists by username
//	@Description	Gets all lists for the given username
//	@Tags			Lists
//	@Accept			json
//	@Produce		json
//	@Param			username	path	string	true	"Username"
//	@Success		200	{object}	h.R{data=GetUsersListsResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Router			/lists/user/{username} [get]
func (s *handlers) GetUsersLists(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errUsernameRequired.Error())
	}

	res, err := s.service.getUsersLists(username)

	if err != nil {
		return h.HandleDbErr(c, err)
	}

	return c.JSON(http.StatusOK, h.R{
		Data: res,
	})
}

// Get Item List Info godoc
//
//	@Summary		Get list item information
//	@Description	Gets a list item information
//	@Tags			Lists
//	@Accept			json
//	@Produce		json
//	@Param			hservice_id	path	string	true	"HService ID"
//	@Success		200	{object}	h.R{data=GetItemListInfoResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/lists/info/{hservice_id} [get]
func (s *handlers) GetItemListInfo(c echo.Context) error {
	userId := c.Get("user_id").(string)
	hserviceId := c.Param("hservice_id")

	if hserviceId == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errHServiceIdRequired.Error())
	}

	res, err := s.service.getItemListInfo(userId, hserviceId)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusOK, h.R{
				Data: []GetItemListInfoResponseDtoItem{},
			})
		}

		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.R{
		Data: res,
	})
}

// Get List By Id godoc
//
//	@Summary		Get list by ID
//	@Description	Gets a list by ID
//	@Tags			Lists
//	@Accept			json
//	@Produce		json
//	@Param			id	path	string	true	"List ID"
//	@Success		200	{object}	h.R{data=GetListByIdResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Router			/lists/{id} [get]
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

// Create List godoc
//
//	@Summary		Create a new list
//	@Description	Creates a new list with the given title for the current user
//	@Tags			Lists
//	@Accept			json
//	@Produce		json
//	@Param			body	body	CreateListRequestDto	true	"Request body"
//	@Success		201	{object}	h.R{data=CreateListResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/lists [post]
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

	return c.JSON(http.StatusCreated, h.R{
		Data: res,
	})
}

// Create List Item godoc
//
//	@Summary		Create a new list item
//	@Description	Creates a new list item with the given list ID for the current user
//	@Tags			Lists
//	@Accept			json
//	@Produce		json
//	@Param			id	path	string	true	"List ID"
//	@Param			body	body	CreateListItemRequestDto	true	"Request body"
//	@Success		201	{object}	h.R{data=CreateListItemResponseDto}	"Successful request"
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/lists/{id}/items [post]
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

	return c.JSON(http.StatusCreated, h.R{
		Data: res,
	})
}

// Delete List godoc
//
//	@Summary		Delete a list
//	@Description	Deletes a list with the given ID for the current user
//	@Tags			Lists
//	@Param			id	path	string	true	"List ID"
//	@Success		204
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/lists/{id} [delete]
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

// Delete List Item godoc
//
//	@Summary		Delete a list item
//	@Description	Deletes a list item with the given ID for the current user
//	@Tags			Lists
//	@Param			id	path	string	true	"List ID"
//	@Param			itemId	path	string	true	"Item ID"
//	@Success		204
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/lists/{id}/items/{itemId} [delete]
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

// Move List Item After godoc
//
//	@Summary		Move a list item after another item
//	@Description	Moves a list item with the given ID after another item with the given ID for the current user
//	@Tags			Lists
//	@Param			list_id	path	string	true	"List ID"
//	@Param			item_id	path	string	true	"Item ID"
//	@Param			after_item_id	path	string	true	"After Item ID"
//	@Success		204
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/lists/{list_id}/items/{item_id}/after/{after_item_id} [patch]
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

// Update List godoc
//
//	@Summary		Update a list
//	@Description	Updates a list with the given ID for the current user
//	@Tags			Lists
//	@Param			id	path	string	true	"List ID"
//	@Param			body	body	UpdateListRequestDto	true	"Request body"
//	@Success		204
//	@Failure		400	{object}	echo.HTTPError	"Bad Request"
//	@Failure		401	{object}	echo.HTTPError	"Authentication failed"
//	@Failure		404	{object}	echo.HTTPError	"Not Found"
//	@Failure		500	{object}	echo.HTTPError	"Internal Server Error"
//	@Security		CookieAuth
//	@Router			/lists/{id} [patch]
func (s *handlers) UpdateList(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")
	dto := c.Get("body").(UpdateListRequestDto)

	if id == "" {
		return echo.NewHTTPError(http.StatusBadRequest, errIdRequired.Error())
	}

	err := s.service.updateListTitle(id, userId, dto.Title)

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}
