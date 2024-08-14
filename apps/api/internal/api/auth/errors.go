package auth

import "errors"

var (
	ErrInvalidEmailOrPassword = errors.New("Invalid email or password")
	ErrPasswordDontMatch      = errors.New("Current password doesn't match")
	ErrPasswordTooWeak        = errors.New("Password is too weak")
	ErrHash                   = errors.New("Cannot hash")
	ErrPrevLinkNotExpired     = errors.New("Previous link hasn't expired")
	ErrInvalidCode            = errors.New("Invalid code")
	ErrPrevCodeNotExpired     = errors.New("Previous code hasn't expired")
	ErrUsernameChars          = errors.New("Username must include only alphanumeric characters or underscore")
	ErrEmailTaken             = errors.New("Email has already been taken")
	ErrUsernameTaken          = errors.New("Username has already been taken")
	ErrInvalidSessionState    = errors.New("Invalid session state")
	ErrInvalidStateParameter  = errors.New("Invalid state parameter")
	ErrOAuthTokenExchange     = errors.New("Failed to exchange token")
	ErrOAuthFailedUserFetch   = errors.New("Failed to fetch user")
	ErrOAuthInvalidUserResp   = errors.New("Failed to parse user")
)
