package lists

import "errors"

var (
	errUsernameRequired         = errors.New("username is required")
	errHServiceIdRequired       = errors.New("hservice_id is required")
	errIdRequired               = errors.New("id is required")
	errMaxListReached           = errors.New("you can only have up to 128 lists")
	errMaxListItemReached       = errors.New("you can only have up to 512 items in a list")
	errListIdRequired           = errors.New("list_id is required")
	errItemIdRequired           = errors.New("item_id is required")
	errAfterItemIdRequired      = errors.New("after_item_id is required")
	errUnauthorizedMoveListItem = errors.New("you are not authorized to move this list item")
)
