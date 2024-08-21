package random

import (
	"crypto/rand"
	randv1 "math/rand"
)

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

// Generates a unique string from the allowed runes.
func GenerateLetterString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[randv1.Intn(len(letterRunes))]
	}
	return string(b)
}

// Generate n random bytes
func GenerateBytes(n uint32) ([]byte, error) {
	arr := make([]byte, n)
	_, err := rand.Read(arr)

	if err != nil {
		return nil, err
	}

	return arr, nil
}
