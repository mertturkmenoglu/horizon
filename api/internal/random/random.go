package random

import (
	"crypto/rand"
	"fmt"
	"math/big"
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

// Generate 6 digits random string code
func GenerateSixDigitsCode() (string, error) {
	n, err := rand.Int(rand.Reader, big.NewInt(999999))

	if err != nil {
		return "", err
	}

	s := fmt.Sprintf("%06d", n)
	return s, nil
}
