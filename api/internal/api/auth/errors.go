package auth

import "errors"

var (
	errInvalidEmailOrPassword            = errors.New("invalid email or password")
	errPasswordDontMatch                 = errors.New("current password doesn't match")
	errPasswordTooWeak                   = errors.New("password is too weak")
	errHash                              = errors.New("cannot hash")
	errPrevLinkNotExpired                = errors.New("previous link hasn't expired")
	errInvalidCode                       = errors.New("invalid code")
	errPrevCodeNotExpired                = errors.New("previous code hasn't expired")
	errUsernameChars                     = errors.New("username must include only alphanumeric characters or underscore")
	errEmailTaken                        = errors.New("email has already been taken")
	errUsernameTaken                     = errors.New("username has already been taken")
	errInvalidSessionState               = errors.New("invalid session state")
	errInvalidStateParameter             = errors.New("invalid state parameter")
	errOAuthTokenExchange                = errors.New("failed to exchange token")
	errOAuthFailedUserFetch              = errors.New("failed to fetch user")
	errOAuthInvalidUserResp              = errors.New("failed to parse user")
	errInvalidEmail                      = errors.New("invalid email")
	errEmailAlreadyVerified              = errors.New("email has already been verified")
	errMalformedOrMissingVerifyCode      = errors.New("verification code is missing or malformed")
	errInvalidOrExpiredVerifyCode        = errors.New("verification code is invalid or expired")
	errPasswordResetCodeExpiredOrInvalid = errors.New("password reset code is invalid or expired")
)
