package h

import "horizon/internal/pagination"

// Utility type to wrap arbitrary JSON responses
type Response[T any] map[string]T

type PaginatedResponse[T any] struct {
	Data       T                     `json:"data"`
	Pagination pagination.Pagination `json:"pagination"`
}

type AnyResponse map[string]interface{}

type ErrResponse struct {
	Message string `json:"message"`
}
