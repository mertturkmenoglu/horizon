package uploads

import (
	"fmt"
	"testing"

	"github.com/google/uuid"
)

const errUtilsFmtStr = "Expected %v, got %v"

func TestGetFileExtensionFromMimeTypeShouldReturnCorrectValues(t *testing.T) {
	inputs := []struct {
		mimeType string
		expected string
	}{
		{"image/jpeg", "jpg"},
		{"image/jpg", "jpg"},
		{"image/png", "png"},
		{"image/gif", "gif"},
		{"image/webp", "webp"},
	}

	for _, input := range inputs {
		actual := getFileExtensionFromMimeType(input.mimeType)

		if actual != input.expected {
			t.Errorf(errUtilsFmtStr, input.expected, actual)
		}
	}
}

func TestGetFileExtensionFromMimeTypeShouldReturnEmptyStringForInvalidMimeTypes(t *testing.T) {
	invalidMimeTypes := []string{
		"image/avif",
		"image/bmp",
		"image/tiff",
		"video/mp4",
		"video/mpeg",
		"video/quicktime",
		"application/pdf",
	}

	for _, mimeType := range invalidMimeTypes {
		expected := ""
		actual := getFileExtensionFromMimeType(mimeType)

		if actual != expected {
			t.Errorf(errUtilsFmtStr, expected, actual)
		}
	}
}

func TestConstructFilenameShouldReturnCorrectFilename(t *testing.T) {
	inputs := []struct {
		key      string
		fileExt  string
		expected string
	}{
		{"123", "jpg", "123.jpg"},
		{"456", "png", "456.png"},
		{"789", "gif", "789.gif"},
		{"101112", "webp", "101112.webp"},
	}

	for _, input := range inputs {
		actual := constructFilename(input.key, input.fileExt)

		if actual != input.expected {
			t.Errorf(errUtilsFmtStr, input.expected, actual)
		}
	}
}

func TestConstructFilenameShouldReturnCorrectFilenameForRandomizedTestCases(t *testing.T) {
	for i := 0; i < 100; i++ {
		key := uuid.New().String()
		fileExt := uuid.New().String()
		expected := fmt.Sprintf("%s.%s", key, fileExt)
		actual := constructFilename(key, fileExt)

		if actual != expected {
			t.Errorf(errUtilsFmtStr, expected, actual)
		}
	}
}
