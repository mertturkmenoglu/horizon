// Package h provides utility/helper types you would need when you are returning
// a JSON response from a handler.
package h

import "horizon/internal/pagination"

// Utility type to wrap arbitrary JSON responses
type Response[T any] struct {
	Data T `json:"data"`
}

type MetadataResponse[T any, M any] struct {
	Data T `json:"data"`
	Meta M `json:"metadata"`
}

// A PaginatedResponse is similar to [horizon/internal/h/Response] type but it is used for
// returning paginated data.
type PaginatedResponse[T any] struct {
	Data       T                     `json:"data"`
	Pagination pagination.Pagination `json:"pagination"`
}

// An AnyResponse type is usually used to return an arbitrary map value and it doesn't require
// you to specify the data type.
type AnyResponse map[string]interface{}

// An ErrResponse is used to return an error message in a HTTP response.
type ErrResponse struct {
	Message string `json:"message"`
}