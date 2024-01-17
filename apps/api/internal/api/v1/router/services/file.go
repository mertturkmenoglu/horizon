package services

import (
	"fmt"
	"horizon/internal/api"
	"mime/multipart"
	"slices"

	"github.com/minio/minio-go/v7"
	"github.com/spf13/viper"
)

func checkFile(file *multipart.FileHeader) error {
	var maxFileSize int64 = 16e6 // 16 MBs
	acceptable := []string{
		"image/jpg", "image/jpeg", "image/png", "video/mp4",
	}

	ct := file.Header.Get("Content-Type")
	ctOk := slices.Contains(acceptable, ct)
	sizeOk := file.Size < maxFileSize

	if !ctOk {
		return api.NewBadRequestError("Unsupported MIME type")
	}

	if !sizeOk {
		return api.NewContentTooLargeError("Max size is 16 MBs")
	}

	return nil
}

func putFile(contentType string, src multipart.File) (*minio.UploadInfo, error) {
	flakeId, err := api.App.Flake.NextID()

	if err != nil {
		return nil, err
	}

	ctx := api.App.Upload.Context
	bucket := viper.GetString("minio.buckets.services")
	ext := getExtensionFromContentType(contentType)
	name := fmt.Sprintf("%d%s", flakeId, ext)

	info, err := api.App.Upload.Client.PutObject(ctx, bucket, name, src, -1, minio.PutObjectOptions{
		ContentType: contentType,
	})

	return &info, err
}

func removeFile(name string) error {
	ctx := api.App.Upload.Context
	bucket := viper.GetString("minio.buckets.services")
	return api.App.Upload.Client.RemoveObject(ctx, bucket, name, minio.RemoveObjectOptions{})
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

	if contentType == "video/mp4" {
		return ".mp4"
	}

	return ""
}
