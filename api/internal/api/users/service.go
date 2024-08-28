package users

func (s *service) getUserProfileByUsername(username string) (*GetUserProfileByUsernameResponseDto, error) {
	dbResult, err := s.repository.getUserProfileByUsername(username)

	if err != nil {
		return nil, err
	}

	res := mapGetUserProfileByUsernameRowToDto(dbResult)

	return &res, nil
}