package favorites

import "errors"

var (
	errHServiceIdRequired = errors.New("hservice_id is required")
	errUsernameRequired   = errors.New("username is required")
)
