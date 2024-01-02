package hash

import "crypto/rand"

// Generate n random bytes
func GenerateRandomBytes(n uint32) ([]byte, error) {
	arr := make([]byte, n)
	_, err := rand.Read(arr)

	if err != nil {
		return nil, err
	}

	return arr, nil
}
