package hservices

import (
	"encoding/json"
	"testing"
)

func TestAllValidTimespanStringsShouldReturnTrue(t *testing.T) {
	inputs := ValidTimespans

	for _, input := range inputs {
		expected := true
		actual := isValidTimespan(input)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}

func TestInvalidTimespanStringsShouldReturnFalse(t *testing.T) {
	inputs := []string{
		"HOURRR",
		"DAI",
		"WEK",
		"MOTNH",
		"YeAR",
	}

	for _, input := range inputs {
		expected := false
		actual := isValidTimespan(input)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}

func TestValidPriceUnitStringsShouldReturnTrue(t *testing.T) {
	inputs := ValidPriceUnits

	for _, input := range inputs {
		expected := true
		actual := isValidPriceUnit(input)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}

func TestInvalidPriceUnitStringsShouldReturnFalse(t *testing.T) {
	inputs := []string{
		"$",
		"£",
		"€",
		"¥",
		"฿",
		"₹",
		"₽",
		"₴",
		"₫",
		"₪",
		"₩",
		"₭",
		"₦",
		"₨",
		"₮",
		"₰",
		"₲",
		"₱",
		"₯",
		"₡",
		"₠",
		"₢",
		"usd",
		"eur",
	}

	for _, input := range inputs {
		expected := false
		actual := isValidPriceUnit(input)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}

func TestValidMediaStringsShouldReturnTrue(t *testing.T) {
	inputs := []string{
		"{}",
		"{\"key\":\"value\"}",
	}

	for _, input := range inputs {
		expected := true
		actual := isValidMedia(input)

		if actual != expected {
			t.Errorf("Expected %v, got %v, value: %v", expected, actual, input)
		}
	}
}

func TestInvalidMediaStringsShouldReturnFalse(t *testing.T) {
	inputs := []string{
		"[]",
		"\"\"",
		"[\"key\",\"value\"]",
	}

	for _, input := range inputs {
		expected := false
		actual := isValidMedia(input)

		if actual != expected {
			t.Errorf("Expected %v, got %v", expected, actual)
		}
	}
}

func TestValidMediaShouldRetunTrue(t *testing.T) {
	var media = map[string]any{
		"data": map[string]any{
			"type":      "image",
			"url":       "https://example.com/image.jpg",
			"thumbnail": "https://example.com/image-thumbnail.jpg",
			"alt":       "Image Alt",
			"caption":   "Image Caption",
			"width":     1920,
			"height":    1080,
		},
	}

	str, err := json.Marshal(media)

	if err != nil {
		t.Errorf("Error marshalling media: %v", err)
	}

	expected := true
	actual := isValidMedia(string(str))

	if actual != expected {
		t.Errorf("Expected %v, got %v", expected, actual)
	}
}
