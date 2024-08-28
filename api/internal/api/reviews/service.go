package reviews

import (
	"horizon/internal/pagination"
)

func (s *service) getHServiceReviews(
	id string,
	params pagination.Params,
) (*GetReviewsByHServiceIdResponseDto, *pagination.Pagination, error) {
	dbResult, err := s.repository.getReviewsByHServiceId(id, params)

	if err != nil {
		return nil, nil, err
	}

	count, err := s.repository.countReviewsByHServiceId(id)

	if err != nil {
		return nil, nil, err
	}

	paginationData := pagination.Compute(params, count)

	res, err := mapGetReviewsByHServiceIdToDto(dbResult)

	if err != nil {
		return nil, nil, err
	}

	return &res, &paginationData, nil
}

func (s *service) getUserReviews(
	username string,
	params pagination.Params,
) (*GetReviewsByUsernameResponseDto, *pagination.Pagination, error) {
	dbResult, err := s.repository.getReviewsByUsername(username, params)

	if err != nil {
		return nil, nil, err
	}

	count, err := s.repository.countReviewsByUsername(username)

	if err != nil {
		return nil, nil, err
	}

	paginationData := pagination.Compute(params, count)

	res, err := mapGetReviewsByUsernameToDto(dbResult)

	if err != nil {
		return nil, nil, err
	}

	return &res, &paginationData, nil
}

func (s *service) getReview(id string) (*ReviewItemDto, error) {
	dbResult, err := s.repository.getReviewById(id)

	if err != nil {
		return nil, err
	}

	res, err := mapGetReviewByIdToDto(dbResult)

	if err != nil {
		return nil, err
	}

	return &res, nil
}

func (s *service) createReview(userId string, dto CreateReviewRequestDto) (*CreateReviewResponseDto, error) {
	dbResult, err := s.repository.createReview(userId, dto)

	if err != nil {
		return nil, err
	}

	res, err := mapCreateReviewToDto(dbResult)

	if err != nil {
		return nil, err
	}

	return &res, nil
}

func (s *service) deleteReview(id string, userId string) error {
	return s.repository.deleteReviewById(id, userId)
}

func (s *service) createReviewVote(id string, userId string, dto CreateReviewVoteRequestDto) error {
	reviewVoteType, err := validateReviewVoteType(dto.VoteType)

	if err != nil {
		return err
	}

	_, err = s.repository.createReviewVote(id, userId, reviewVoteType)

	return err
}

func (s *service) deleteReviewVote(id string, userId string) error {
	return s.repository.deleteReviewVoteById(id, userId)
}
