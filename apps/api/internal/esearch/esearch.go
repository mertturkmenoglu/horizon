package esearch

import (
	"context"

	"github.com/elastic/go-elasticsearch/v8"
)

type Search struct {
	Client  *elasticsearch.TypedClient
	Context context.Context
}

func New() *Search {
	client, err := elasticsearch.NewTypedClient(elasticsearch.Config{})

	if err != nil {
		panic(err.Error())
	}

	s := Search{
		Client:  client,
		Context: context.Background(),
	}

	return &s
}
