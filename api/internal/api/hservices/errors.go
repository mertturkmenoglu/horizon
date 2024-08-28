package hservices

import "errors"

var (
	errInvalidDeliveryTimespan = errors.New("invalid delivery timespan")
	errInvalidPriceTimespan    = errors.New("invalid price timespan")
	errInvalidPriceUnit        = errors.New("invalid price unit")
	errInvalidMedia            = errors.New("invalid media")
	errIdRequired              = errors.New("id is required")
	errUsernameRequired        = errors.New("username is required")
)
