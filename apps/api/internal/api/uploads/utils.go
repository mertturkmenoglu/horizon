package uploads

import "fmt"

func getFileExtensionFromMimeType(mimeType string) string {
	switch mimeType {
	case "image/jpeg":
		return "jpg"
	case "image/jpg":
		return "jpg"
	case "image/png":
		return "png"
	case "image/gif":
		return "gif"
	case "image/webp":
		return "webp"
	default:
		return ""
	}
}

func constructFilename(key string, fileExtension string) string {
	return fmt.Sprintf("%s.%s", key, fileExtension)
}
