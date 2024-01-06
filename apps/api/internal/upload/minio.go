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
	buckets := viper.GetStringMapString("minio.buckets")
	location := viper.GetString("minio.location")

	for _, v := range buckets {
		if exists, _ := minioClient.BucketExists(ctx, v); !exists {
			err = minioClient.MakeBucket(ctx, v, minio.MakeBucketOptions{
				Region: location,
			})

			if err != nil {
				log.Fatal("Cannot create bucket", v)
			}
		}
	}
}

func Client() *minio.Client {
	if minioClient == nil {
		New()
	}
	return minioClient
}
