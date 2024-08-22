package lists

func isUserAllowedToCreateList(listCount int) bool {
	return listCount < MaxListPerUser
}

func isUserAllowedToCreateListItem(itemCount int) bool {
	return itemCount < MaxListItemCount
}
