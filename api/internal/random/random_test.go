package random

import "testing"

func TestRandStringRunesShouldReturnEmptyStringForZeroLength(t *testing.T) {
	input := 0
	expected := ""
	actual := GenerateLetterString(input)

	if actual != expected {
		t.Errorf("Expected %v, got %v", expected, actual)
	}
}

func TestRandStringRunesShouldPanicForNegativeLength(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Errorf("The code did not panic")
		}
	}()

	input := -1
	_ = GenerateLetterString(input)
}

func TestRandStringRunesShouldReturnCorrectLengthStringForNonZeroLength(t *testing.T) {
	for i := 1; i < 100; i++ {
		expected := i
		actual := len(GenerateLetterString(i))

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}

func TestRandomBytesShouldReturnCorrectLength(t *testing.T) {
	for i := 1; i < 100; i++ {
		expected := i
		byteArr, err := GenerateBytes(uint32(i))

		if err != nil {
			t.Errorf("Error generating random bytes: %v", err)
		}

		actual := len(byteArr)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}
