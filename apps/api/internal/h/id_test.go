package h

import "testing"

func TestRandStringRunesShouldReturnEmptyStringForZeroLength(t *testing.T) {
	input := 0
	expected := ""
	actual := RandStringRunes(input)

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
	_ = RandStringRunes(input)
}

func TestRandStringRunesShouldReturnCorrectLengthStringForNonZeroLength(t *testing.T) {
	for i := 1; i < 100; i++ {
		expected := i
		actual := len(RandStringRunes(i))

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}
