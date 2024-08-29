package lists

import (
	"context"
	"horizon/internal/db"
	"horizon/internal/h"
)

func (r *repository) getMyLists(userId string) ([]db.List, error) {
	return r.db.Queries.GetMyLists(context.Background(), userId)
}

func (r *repository) getUsersLists(username string) ([]db.GetUsersListsRow, error) {
	return r.db.Queries.GetUsersLists(context.Background(), username)
}

func (r *repository) getListItemsInfo(userId string, hserviceId string) ([]db.ListItem, error) {
	return r.db.Queries.GetListItemsInfo(context.Background(), db.GetListItemsInfoParams{
		UserID:     userId,
		HserviceID: hserviceId,
	})
}

func (r *repository) getListById(id string) (db.GetListByIdRow, error) {
	return r.db.Queries.GetListById(context.Background(), id)
}

func (r *repository) getListItemsByListId(listId string) ([]db.GetListItemsByListIdRow, error) {
	return r.db.Queries.GetListItemsByListId(context.Background(), listId)
}

func (r *repository) getUserListCount(userId string) (int64, error) {
	return r.db.Queries.GetUserListCount(context.Background(), userId)
}

func (r *repository) createList(userId string, dto CreateListRequestDto) (db.List, error) {
	return r.db.Queries.CreateList(context.Background(), db.CreateListParams{
		ID:     h.GenerateId(r.flake),
		UserID: userId,
		Title:  dto.Title,
	})
}

func (r *repository) getListItemCount(listId string) (int64, error) {
	return r.db.Queries.GetListItemCount(context.Background(), listId)
}

func (r *repository) createListItem(dto CreateListItemRequestDto) (db.ListItem, error) {
	return r.db.Queries.CreateListItem(context.Background(), db.CreateListItemParams{
		ID:         h.GenerateId(r.flake),
		ListID:     dto.ListId,
		HserviceID: dto.HserviceId,
		ItemOrder:  int32(dto.ItemOrder),
	})
}

func (r *repository) deleteList(userId string, id string) error {
	return r.db.Queries.DeleteListById(context.Background(), db.DeleteListByIdParams{
		ID:     id,
		UserID: userId,
	})
}

func (r *repository) deleteListItem(userId string, id string) error {
	return r.db.Queries.DeleteListItemById(context.Background(), db.DeleteListItemByIdParams{
		ID:     id,
		UserID: userId,
	})
}

func (r *repository) getListItemById(id string, listId string) (db.GetListItemByIdRow, error) {
	return r.db.Queries.GetListItemById(context.Background(), db.GetListItemByIdParams{
		ID:     id,
		ListID: listId,
	})
}

func (r *repository) moveListItemBefore(listId string, itemId string, listItemOrder int32, afterItemOrder int32) error {
	ctx := context.Background()
	tx, err := r.db.Pool.Begin(ctx)

	if err != nil {
		return err
	}

	defer tx.Rollback(ctx)

	qtx := r.db.Queries.WithTx(tx)

	err = qtx.UpdateListItemOrderWithIndexRangeDecr(ctx, db.UpdateListItemOrderWithIndexRangeDecrParams{
		ListID:      listId,
		ItemOrder:   listItemOrder + 1,
		ItemOrder_2: afterItemOrder,
	})

	if err != nil {
		return err
	}

	err = qtx.UpdateListItemOrder(ctx, db.UpdateListItemOrderParams{
		ID:        itemId,
		ItemOrder: afterItemOrder,
	})

	if err != nil {
		return err
	}

	err = tx.Commit(ctx)

	if err != nil {
		return err
	}

	return nil
}

func (r *repository) moveListItemAfter(listId string, itemId string, listItemOrder int32, afterItemOrder int32) error {
	ctx := context.Background()
	tx, err := r.db.Pool.Begin(ctx)

	if err != nil {
		return err
	}

	defer tx.Rollback(ctx)

	qtx := r.db.Queries.WithTx(tx)

	err = qtx.UpdateListItemOrderWithIndexRangeIncr(ctx, db.UpdateListItemOrderWithIndexRangeIncrParams{
		ListID:      listId,
		ItemOrder:   afterItemOrder + 1,
		ItemOrder_2: listItemOrder - 1,
	})

	if err != nil {
		return err
	}

	err = qtx.UpdateListItemOrder(ctx, db.UpdateListItemOrderParams{
		ID:        itemId,
		ItemOrder: afterItemOrder + 1,
	})

	if err != nil {
		return err
	}

	err = tx.Commit(ctx)

	if err != nil {
		return err
	}

	return nil
}

func (r *repository) updateListTitle(id string, userId string, title string) error {
	return r.db.Queries.UpdateListTitle(context.Background(), db.UpdateListTitleParams{
		ID:     id,
		UserID: userId,
		Title:  title,
	})
}
