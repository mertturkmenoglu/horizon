package users

import (
	"context"
	"horizon/internal/api"
	"horizon/internal/upload"
	"mime/multipart"

	"github.com/minio/minio-go/v7"
	"github.com/spf13/viper"
)

func checkFile(file *multipart.FileHeader) error {
	var maxFileSize int64 = 5e6

	contentType := file.Header.Get("Content-Type")
	contentTypeOk := contentType == "image/jpg" || contentType == "image/jpeg" || contentType == "image/png"
	sizeOk := file.Size <= maxFileSize

	if !contentTypeOk {
		return api.NewBadRequestError("Unsupported MIME type")
	}

	if !sizeOk {
		return api.NewContentTooLargeError("Max size is 5 MBs")
	}

	return nil
}

func putFile(username string, contentType string, src multipart.File) (minio.UploadInfo, error) {
	ext := getExtensionFromContentType(contentType)
	obj := username + ext
	ctx := context.Background()
	bucket := viper.GetString("minio.buckets.profile-images")

	return upload.Client().PutObject(ctx, bucket, obj, src, -1, minio.PutObjectOptions{
		ContentType: contentType,
	})
}

func getExtensionFromContentType(contentType string) string {
	if contentType == "image/jpg" {
		return ".jpg"
	}

	if contentType == "image/jpeg" {
		return ".jpeg"
	}

	if contentType == "image/png" {
		return ".png"
	}

	return ""
}
