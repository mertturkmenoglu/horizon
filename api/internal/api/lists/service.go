package lists

import "horizon/internal/db"

func (s *service) getMyLists(userId string) ([]GetMyListsResponseDtoItem, error) {
	dbRes, err := s.repository.getMyLists(userId)

	if err != nil {
		return nil, err
	}

	res := mapGetMyListsResultToDto(dbRes)

	return res, nil
}

func (s *service) getUsersLists(username string) ([]GetUsersListsResponseDtoItem, error) {
	dbRes, err := s.repository.getUsersLists(username)

	if err != nil {
		return nil, err
	}

	res := mapGetUsersListsResultToDto(dbRes)

	return res, nil
}

func (s *service) getItemListInfo(userId string, hserviceId string) ([]GetItemListInfoResponseDtoItem, error) {
	dbMyLists, err := s.repository.getMyLists(userId)

	if err != nil {
		return nil, err
	}

	dbListItems, err := s.repository.getListItemsInfo(userId, hserviceId)

	if err != nil {
		return nil, err
	}

	res := mapGetItemListInfoResultToDto(dbMyLists, dbListItems)

	return res, nil
}

func (s *service) getListById(id string) (GetListByIdResponseDto, error) {
	dbList, err := s.repository.getListById(id)

	if err != nil {
		return GetListByIdResponseDto{}, err
	}

	dbListItems, err := s.repository.getListItemsByListId(id)

	if err != nil {
		return GetListByIdResponseDto{}, err
	}

	res, err := mapGetListByIdResultToDto(dbList, dbListItems)

	if err != nil {
		return GetListByIdResponseDto{}, err
	}

	return res, nil
}

func (s *service) getUserListsCount(userId string) (int64, error) {
	count, err := s.repository.getUserListCount(userId)

	if err != nil {
		return -1, err
	}

	return count, nil
}

func (s *service) checkIfUserIsAllowedToCreateList(userId string) bool {
	count, err := s.getUserListsCount(userId)

	if err != nil {
		return false
	}

	return isUserAllowedToCreateList(int(count))
}

func (s *service) createList(userId string, dto CreateListRequestDto) (CreateListResponseDto, error) {
	dbResult, err := s.repository.createList(userId, dto)

	if err != nil {
		return CreateListResponseDto{}, err
	}

	res := mapCreateListResultToDto(dbResult)

	return res, nil
}

func (s *service) getListItemCount(listId string) (int64, error) {
	count, err := s.repository.getListItemCount(listId)

	if err != nil {
		return -1, err
	}

	return count, nil
}

func (s *service) checkIfUserIsAllowedToCreateListItem(listId string) bool {
	count, err := s.getListItemCount(listId)

	if err != nil {
		return false
	}

	return isUserAllowedToCreateListItem(int(count))
}

func (s *service) createListItem(dto CreateListItemRequestDto) (CreateListItemResponseDto, error) {
	dbResult, err := s.repository.createListItem(dto)

	if err != nil {
		return CreateListItemResponseDto{}, err
	}

	res := mapCreateListItemResultToDto(dbResult)

	return res, nil
}

func (s *service) deleteList(userId string, id string) error {
	return s.repository.deleteList(userId, id)
}

func (s *service) deleteListItem(userId string, id string) error {
	return s.repository.deleteListItem(userId, id)
}

func (s *service) checkMoveListItemParams(listId string, itemId string, afterItemId string) error {
	if listId == "" {
		return errListIdRequired
	}

	if itemId == "" {
		return errItemIdRequired
	}

	if afterItemId == "" {
		return errAfterItemIdRequired
	}

	return nil
}

func (s *service) getListItemById(id string, listId string) (db.GetListItemByIdRow, error) {
	return s.repository.getListItemById(id, listId)
}

func (s *service) moveListItemAfter(
	listId string,
	listItem db.GetListItemByIdRow,
	afterItem db.GetListItemByIdRow,
) error {
	if listItem.ItemOrder < afterItem.ItemOrder {
		return s.repository.moveListItemBefore(listId, listItem.ID, listItem.ItemOrder, afterItem.ItemOrder)
	} else {
		return s.repository.moveListItemAfter(listId, listItem.ID, listItem.ItemOrder, afterItem.ItemOrder)
	}
}
