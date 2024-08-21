package upload

import (
	"context"
	"fmt"
	"horizon/config"
	"log"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/spf13/viper"
)

type Upload struct {
	Client  *minio.Client
	Context context.Context
}

func New() *Upload {
	endpoint := viper.GetString(config.MINIO_ENDPOINT)
	id := viper.GetString(config.MINIO_USER)
	secret := viper.GetString(config.MINIO_PASSWORD)

	client, err := minio.New(endpoint, &minio.Options{
		Creds: credentials.NewStaticV4(id, secret, ""),
	})

	if err != nil {
		log.Fatal("cannot create minio client", err.Error())
	}

	up := &Upload{
		Client:  client,
		Context: context.Background(),
	}

	buckets := viper.GetStringSlice(config.MINIO_BUCKETS)
	location := viper.GetString(config.MINIO_LOCATION)
	autocreateBuckets := viper.GetBool(config.MINIO_AUTOCREATE_BUCKETS)

	if autocreateBuckets {
		for _, bucketName := range buckets {
			if exists, _ := up.Client.BucketExists(up.Context, bucketName); !exists {
				err = up.Client.MakeBucket(up.Context, bucketName, minio.MakeBucketOptions{
					Region: location,
				})

				if err != nil {
					log.Fatal("cannot create bucket", bucketName)
				} else {
					fmt.Println("Bucket created", bucketName)
				}

				policy := `{
					"Version": "2012-10-17",
					"Statement": [
						{
							"Effect": "Allow",
							"Principal": "*",
							"Action": "s3:GetObject",
							"Resource": "arn:aws:s3:::` + bucketName + `/*"
						}
					]
				}`

				err := up.Client.SetBucketPolicy(context.Background(), bucketName, policy)

				if err != nil {
					fmt.Println("Cannot set bucket policy", bucketName, err.Error())
				}
			}
		}
	}

	return up
}
