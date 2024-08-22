package lists

import (
	"context"
	"errors"
	"fmt"
	"horizon/internal/db"
	"horizon/internal/h"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

func (s *Module) HandlerGetMyLists(c echo.Context) error {
	userId := c.Get("user_id").(string)

	dbResult, err := s.Db.Queries.GetMyLists(context.Background(), userId)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}

		return echo.ErrInternalServerError
	}

	res := mapGetMyListsResultToDto(dbResult)

	return c.JSON(http.StatusOK, h.Response[GetMyListsResponseDto]{
		Data: res,
	})
}

func (s *Module) HandlerGetUsersLists(c echo.Context) error {
	username := c.Param("username")

	if username == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "username is required",
		})
	}

	dbResult, err := s.Db.Queries.GetUsersLists(context.Background(), username)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}

		return echo.ErrInternalServerError
	}

	res := mapGetUsersListsResultToDto(dbResult)

	return c.JSON(http.StatusOK, h.Response[GetUsersListsResponseDto]{
		Data: res,
	})
}

func (s *Module) HandlerGetItemListInfo(c echo.Context) error {
	userId := c.Get("user_id").(string)
	hserviceId := c.Param("hservice_id")

	if hserviceId == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "hservice_id is required",
		})
	}

	dbMyLists, err := s.Db.Queries.GetMyLists(context.Background(), userId)

	if err != nil {
		if !errors.Is(err, pgx.ErrNoRows) {
			return echo.ErrInternalServerError
		}

		return c.JSON(http.StatusOK, h.Response[GetItemListInfoResponseDto]{
			Data: []GetItemListInfoResponseDtoItem{},
		})
	}

	dbListItems, err := s.Db.Queries.GetListItemsInfo(context.Background(), db.GetListItemsInfoParams{
		UserID:     userId,
		HserviceID: hserviceId,
	})

	if err != nil && !errors.Is(err, pgx.ErrNoRows) {
		return echo.ErrInternalServerError
	}

	res := mapGetItemListInfoResultToDto(dbMyLists, dbListItems)

	return c.JSON(http.StatusOK, h.Response[GetItemListInfoResponseDto]{
		Data: res,
	})
}

func (s *Module) HandlerGetListById(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	dbList, err := s.Db.Queries.GetListById(context.Background(), id)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return c.JSON(http.StatusNotFound, h.ErrResponse{
				Message: "not found",
			})
		}

		return echo.ErrInternalServerError
	}

	dbListItems, err := s.Db.Queries.GetListItemsByListId(context.Background(), id)

	if err != nil {
		if !errors.Is(err, pgx.ErrNoRows) {
			return echo.ErrInternalServerError
		}
	}

	res, err := mapGetListByIdResultToDto(dbList, dbListItems)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, h.Response[GetListByIdResponseDto]{
		Data: res,
	})
}

func (s *Module) HandlerCreateList(c echo.Context) error {
	userId := c.Get("user_id").(string)
	dto := c.Get("body").(CreateListRequestDto)

	dbListCount, _ := s.Db.Queries.GetUserListCount(context.Background(), userId)

	if !isUserAllowedToCreateList(int(dbListCount)) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: fmt.Sprintf("You can only have up to %d lists", MaxListPerUser),
		})
	}

	dbResult, err := s.Db.Queries.CreateList(context.Background(), db.CreateListParams{
		ID:     h.GenerateId(s.Flake),
		UserID: userId,
		Title:  dto.Title,
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	res := mapCreateListResultToDto(dbResult)

	return c.JSON(http.StatusCreated, h.Response[CreateListResponseDto]{
		Data: res,
	})
}

func (s *Module) HandlerCreateListItem(c echo.Context) error {
	dto := c.Get("body").(CreateListItemRequestDto)

	dbListItemCount, _ := s.Db.Queries.GetListItemCount(context.Background(), dto.ListId)

	if !isUserAllowedToCreateListItem(int(dbListItemCount)) {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: fmt.Sprintf("You can only have up to %d items in a list", MaxListItemCount),
		})
	}

	dbResult, err := s.Db.Queries.CreateListItem(context.Background(), db.CreateListItemParams{
		ID:         h.GenerateId(s.Flake),
		ListID:     dto.ListId,
		HserviceID: dto.HserviceId,
		ItemOrder:  int32(dto.ItemOrder),
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	res := mapCreateListItemResultToDto(dbResult)

	return c.JSON(http.StatusCreated, h.Response[CreateListItemResponseDto]{
		Data: res,
	})
}

func (s *Module) HandlerDeleteList(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	err := s.Db.Queries.DeleteListById(context.Background(), db.DeleteListByIdParams{
		ID:     id,
		UserID: userId,
	})

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}

func (s *Module) HandlerDeleteListItem(c echo.Context) error {
	userId := c.Get("user_id").(string)
	id := c.Param("id")

	if id == "" {
		return c.JSON(http.StatusBadRequest, h.ErrResponse{
			Message: "id is required",
		})
	}

	err := s.Db.Queries.DeleteListItemById(context.Background(), db.DeleteListItemByIdParams{
		ID:     id,
		UserID: userId,
	})

	if err != nil {
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusNoContent)
}
