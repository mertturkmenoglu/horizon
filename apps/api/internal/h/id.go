package h

import (
	"fmt"
	"math/rand"

	"github.com/sony/sonyflake"
)

// Generates a unique Flake ID, converts it to string, and returns it.
func GenerateId(flake *sonyflake.Sonyflake) string {
	id, err := flake.NextID()

	if err != nil {
		panic(err)
	}

	return fmt.Sprintf("%d", id)
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

// Generates a unique string from the allowed runes.
func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
