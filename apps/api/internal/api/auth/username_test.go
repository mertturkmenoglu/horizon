package auth

import "testing"

func TestEmptyStringShouldReturnEmptyCLeanEmailLocalPart(t *testing.T) {
	input := ""
	expected := ""
	actual := cleanEmailLocalPart(input)

	if actual != expected {
		t.Errorf("Expected %v, got %v", expected, actual)
	}
}

func TestStringWithInvalidCharactersShouldReturnEmptyCLeanEmailLocalPart(t *testing.T) {
	inputs := []string{
		"#@!",
		"###",
		"!@#$%^&*()",
		"@#$%#@%!@",
		"{}{}",
		",><./?':;\\|",
	}

	for _, input := range inputs {
		expected := ""
		actual := cleanEmailLocalPart(input)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}

func TestStringWithValidCharactersShouldReturnItselfAsCleanEmailLocalPart(t *testing.T) {
	inputs := []string{
		"johndoe",
		"john123doe",
		"johndoe123",
		"johndoe_123",
		"john_doe_123",
	}

	for _, input := range inputs {
		expected := input
		actual := cleanEmailLocalPart(input)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}

