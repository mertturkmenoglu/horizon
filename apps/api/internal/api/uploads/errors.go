package uploads

import "errors"

var (
	ErrInvalidBucketType    = errors.New("type is invalid")
	ErrInvalidCount         = errors.New("count is invalid")
	ErrCountValue           = errors.New("count must be between 1 and 4")
	ErrInvalidMimeType      = errors.New("mime type is not allowed")
	ErrPresignedUrlCreation = errors.New("cannot create presigned url")
)
