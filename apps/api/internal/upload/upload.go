package upload

import (
	"context"
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
		for _, v := range buckets {
			if exists, _ := up.Client.BucketExists(up.Context, v); !exists {
				err = up.Client.MakeBucket(up.Context, v, minio.MakeBucketOptions{
					Region: location,
				})

				if err != nil {
					log.Fatal("cannot create bucket", v)
				}
			}
		}

	}

	return up
}
