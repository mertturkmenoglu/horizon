package hash

import "testing"

func TestRandomBytesShouldReturnCorrectLength(t *testing.T) {
	for i := 1; i < 100; i++ {
		expected := i
		byteArr, err := GenerateRandomBytes(uint32(i))

		if err != nil {
			t.Errorf("Error generating random bytes: %v", err)
		}

		actual := len(byteArr)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}
