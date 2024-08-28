package favorites

import "horizon/internal/pagination"

func (s *service) createFavorite(userId string, dto CreateFavoriteRequestDto) (CreateFavoriteResponseDto, error) {
	saved, err := s.repository.createFavorite(userId, dto)

	if err != nil {
		return CreateFavoriteResponseDto{}, err
	}

	id, _ := saved.ID.Value()
	idstr := id.(string)

	return CreateFavoriteResponseDto{
		ID: idstr,
	}, nil
}

func (s *service) deleteFavorite(userId string, hserviceId string) error {
	return s.repository.deleteFavorite(userId, hserviceId)
}

func (s *service) getUserFavorites(
	userId string,
	params pagination.Params,
) ([]FavoritesResponseDto, *pagination.Pagination, error) {
	dbResult, err := s.repository.getFavoritesByUserId(userId, params)

	if err != nil {
		return nil, nil, err
	}

	count, err := s.repository.countUserFavorites(userId)

	if err != nil {
		return nil, nil, err
	}

	paginationData := pagination.Compute(params, count)

	res := make([]FavoritesResponseDto, 0)

	for _, row := range dbResult {
		dto, err := mapFavoriteToFavoriteDto(row)

		if err != nil {
			return nil, nil, err
		}

		res = append(res, dto)
	}

	return res, &paginationData, nil
}

func (s *service) isFavorite(userId string, hserviceId string) bool {
	return s.repository.isFavorite(userId, hserviceId)
}

func (s *service) getFavoritesByUsername(
	username string,
	params pagination.Params,
) ([]FavoritesResponseDto, *pagination.Pagination, error) {
	dbResult, err := s.repository.getFavoritesByUsername(username, params)

	if err != nil {
		return nil, nil, err
	}

	count, err := s.repository.countUserFavoritesByUsername(username)

	if err != nil {
		return nil, nil, err
	}

	paginationData := pagination.Compute(params, count)

	res := make([]FavoritesResponseDto, 0)

	for _, row := range dbResult {
		dto, err := mapFavoriteToFavoriteDtoByUsername(row)

		if err != nil {
			return nil, nil, err
		}

		res = append(res, dto)
	}

	return res, &paginationData, nil
}
