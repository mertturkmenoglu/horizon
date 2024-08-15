package search

import (
	"horizon/config"

	"github.com/spf13/viper"
	"github.com/typesense/typesense-go/v2/typesense"
)

func New() *typesense.Client {
	serverUrl := viper.GetString(config.SEARCH_SERVER_URL)
	apiKey := viper.GetString(config.SEARCH_API_KEY)
	client := typesense.NewClient(
		typesense.WithServer(serverUrl),
		typesense.WithAPIKey(apiKey),
	)

	createSchemas(client)

	return client
}
