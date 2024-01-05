package upload

import (
	"context"
	"log"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/spf13/viper"
)

var minioClient *minio.Client

func New() {
	if minioClient != nil {
		return
	}

	endpoint := viper.GetString("minio.endpoint")
	id := viper.GetString("minio.user")
	secret := viper.GetString("minio.password")
	client, err := minio.New(endpoint, &minio.Options{
		Creds: credentials.NewStaticV4(id, secret, ""),
	})

	if err != nil {
		log.Fatal("Cannot create Minio Client", err.Error())
	}

	minioClient = client
	ctx := context.Background()
	bucketName := viper.GetString("minio.bucket")
	location := viper.GetString("minio.location")

	if exists, _ := minioClient.BucketExists(ctx, bucketName); !exists {
		err = minioClient.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{
			Region: location,
		})

		if err != nil {
			log.Fatal("Cannot create bucket")
		}
	}
}

func Client() *minio.Client {
	if minioClient == nil {
		New()
	}
	return minioClient
}
