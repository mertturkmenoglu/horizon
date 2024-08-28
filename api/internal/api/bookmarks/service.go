package bookmarks

import (
	"horizon/internal/pagination"
)

func (s *service) createBookmark(userId string, dto CreateBookmarkRequestDto) (CreateBookmarkResponseDto, error) {
	bookmark, err := s.repository.createBookmark(userId, dto)

	if err != nil {
		return CreateBookmarkResponseDto{}, err
	}

	id, _ := bookmark.ID.Value()
	idstr := id.(string)

	return CreateBookmarkResponseDto{
		ID: idstr,
	}, nil
}

func (s *service) deleteBookmark(userId string, hserviceId string) error {
	return s.repository.deleteBookmark(userId, hserviceId)
}

func (s *service) getBookmarks(
	userId string,
	params pagination.Params,
) ([]BookmarksResponseDto, *pagination.Pagination, error) {
	dbResult, err := s.repository.getBookmarksByUserId(userId, params)

	if err != nil {
		return nil, nil, err
	}

	count, err := s.repository.countUserBookmarks(userId)

	if err != nil {
		return nil, nil, err
	}

	paginationData := pagination.Compute(params, count)

	res := make([]BookmarksResponseDto, 0)

	for _, row := range dbResult {
		dto, err := mapBookmarkToBookmarkDto(row)

		if err != nil {
			return nil, nil, err
		}

		res = append(res, dto)
	}

	return res, &paginationData, nil
}

func (s *service) getIsBookmarked(userId string, hserviceId string) bool {
	return s.repository.isBookmarked(userId, hserviceId)
}
