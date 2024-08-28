package uploads

import "errors"

var (
	errInvalidBucketType    = errors.New("type is invalid")
	errInvalidCount         = errors.New("count is invalid")
	errCountValue           = errors.New("count must be between 1 and 4")
	errInvalidMimeType      = errors.New("mime type is not allowed")
	errPresignedUrlCreation = errors.New("cannot create presigned url")
)
