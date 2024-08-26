package reviews

import "errors"

var (
	errIdRequired       = errors.New("id is required")
	errUsernameRequired = errors.New("username is required")
	errVoteTypeInvalid  = errors.New("voteType is invalid")
)
