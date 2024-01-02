package h

// Utility type to wrap arbitrary JSON responses
type Response[T any] map[string]T
