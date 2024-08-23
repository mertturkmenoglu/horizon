package auth

import "errors"

var (
	ErrInvalidEmailOrPassword            = errors.New("invalid email or password")
	ErrPasswordDontMatch                 = errors.New("current password doesn't match")
	ErrPasswordTooWeak                   = errors.New("password is too weak")
	ErrHash                              = errors.New("cannot hash")
	ErrPrevLinkNotExpired                = errors.New("previous link hasn't expired")
	ErrInvalidCode                       = errors.New("invalid code")
	ErrPrevCodeNotExpired                = errors.New("previous code hasn't expired")
	ErrUsernameChars                     = errors.New("username must include only alphanumeric characters or underscore")
	ErrEmailTaken                        = errors.New("email has already been taken")
	ErrUsernameTaken                     = errors.New("username has already been taken")
	ErrInvalidSessionState               = errors.New("invalid session state")
	ErrInvalidStateParameter             = errors.New("invalid state parameter")
	ErrOAuthTokenExchange                = errors.New("failed to exchange token")
	ErrOAuthFailedUserFetch              = errors.New("failed to fetch user")
	ErrOAuthInvalidUserResp              = errors.New("failed to parse user")
	ErrInvalidEmail                      = errors.New("invalid email")
	ErrEmailAlreadyVerified              = errors.New("email has already been verified")
	ErrMalformedOrMissingVerifyCode      = errors.New("verification code is missing or malformed")
	ErrInvalidOrExpiredVerifyCode        = errors.New("verification code is invalid or expired")
	ErrPasswordResetCodeExpiredOrInvalid = errors.New("password reset code is invalid or expired")
)
