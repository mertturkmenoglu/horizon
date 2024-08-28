package hservices

import "horizon/internal/pagination"

func (s *service) createHServiceAdditionalValidations(dto CreateHServiceRequestDto) error {
	// Perform additional validations
	if !isValidTimespan(dto.DeliveryTimespan) {
		return errInvalidDeliveryTimespan
	}

	if !isValidTimespan(dto.PriceTimespan) {
		return errInvalidPriceTimespan
	}

	if !isValidPriceUnit(dto.PriceUnit) {
		return errInvalidPriceUnit
	}

	if !isValidMedia(dto.Media) {
		return errInvalidMedia
	}

	return nil
}

func (s *service) createHService(userId string, dto CreateHServiceRequestDto) (*HServiceWithoutUserResponseDto, error) {
	saved, err := s.repository.createHService(userId, dto)

	if err != nil {
		return nil, err
	}

	res, err := mapHServiceToWithoutUserDto(saved)

	if err != nil {
		return nil, err
	}

	return &res, nil
}

func (s *service) getMyHServices(
	userId string,
	params pagination.Params,
) ([]HServiceWithoutUserResponseDto, *pagination.Pagination, error) {
	dbResult, err := s.repository.getMyHServices(userId, params)

	if err != nil {
		return nil, nil, err
	}

	count, err := s.repository.countMyHServices(userId)

	if err != nil {
		return nil, nil, err
	}

	paginationData := pagination.GetPagination(params, count)

	res := make([]HServiceWithoutUserResponseDto, 0)

	for _, hservice := range dbResult {
		dto, err := mapHServiceToWithoutUserDto(hservice)

		if err != nil {
			return nil, nil, err
		}

		res = append(res, dto)
	}

	return res, &paginationData, nil
}

func (s *service) getHServiceById(id string) (HServiceResponseDto, error) {
	row, err := s.repository.getHServiceById(id)

	if err != nil {
		return HServiceResponseDto{}, err
	}

	return mapRowToDto(Row{
		Hservice: row.Hservice,
		User:     row.User,
	})
}

func (s *service) getHServiceMetadata(id string, userId string) HServiceMetadataDto {
	isFavorite := false
	isBookmarked := false

	if userId != "" {
		isFavorite = s.repository.isFavorite(userId, id)
		isBookmarked = s.repository.isBookmarked(userId, id)
	}

	return HServiceMetadataDto{
		IsFavorite:   isFavorite,
		IsBookmarked: isBookmarked,
	}
}

func (s *service) getHServicesByUsername(
	username string,
	params pagination.Params,
) ([]HServiceResponseDto, *pagination.Pagination, error) {
	dbResult, err := s.repository.getHServicesByUsername(username, params)

	if err != nil {
		return nil, nil, err
	}

	count, err := s.repository.countHServicesByUsername(username)

	if err != nil {
		return nil, nil, err
	}

	paginationData := pagination.GetPagination(params, count)

	res := make([]HServiceResponseDto, 0)

	for _, hservice := range dbResult {
		dto, err := mapRowToDto(Row{
			Hservice: hservice.Hservice,
			User:     hservice.User,
		})

		if err != nil {
			return nil, nil, err
		}

		res = append(res, dto)
	}

	return res, &paginationData, nil
}
