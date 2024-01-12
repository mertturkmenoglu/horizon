package upload

import (
	"context"
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
	endpoint := viper.GetString("minio.endpoint")
	id := viper.GetString("minio.user")
	secret := viper.GetString("minio.password")
	client, err := minio.New(endpoint, &minio.Options{
		Creds: credentials.NewStaticV4(id, secret, ""),
	})

	if err != nil {
		log.Fatal("Cannot create Minio Client", err.Error())
	}

	up := &Upload{
		Client:  client,
		Context: context.Background(),
	}

	buckets := viper.GetStringMapString("minio.buckets")
	location := viper.GetString("minio.location")

	for _, v := range buckets {
		if exists, _ := up.Client.BucketExists(up.Context, v); !exists {
			err = up.Client.MakeBucket(up.Context, v, minio.MakeBucketOptions{
				Region: location,
			})

			if err != nil {
				log.Fatal("Cannot create bucket", v)
			}
		}
	}

	return up
}
