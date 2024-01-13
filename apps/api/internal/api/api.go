package api

import (
	"horizon/internal/cache"
	"horizon/internal/geo"
	"horizon/internal/locale"
	"horizon/internal/upload"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/sony/sonyflake"
)

type AppModule struct {
	Geo    *geo.GeoCoding
	Ip2Geo *geo.Ip2Geo
	Locale *locale.Locale
	Cache  *cache.Cache
	Flake  *sonyflake.Sonyflake
	Upload *upload.Upload
	Search *elasticsearch.TypedClient
}

var App *AppModule

func Init() {
	App = &AppModule{
		Geo:    geo.NewGeoCoding(0.5),
		Locale: locale.New(),
		Cache:  cache.New(),
		Ip2Geo: geo.NewIp2Geo(),
		Upload: upload.New(),
		Flake:  nil,
		Search: nil,
	}

	esClient, err := elasticsearch.NewTypedClient(elasticsearch.Config{})

	if err != nil {
		panic(err.Error())
	}

	App.Search = esClient
	createIndices()

	// Initialize Sonyflake
	flake, err := sonyflake.New(sonyflake.Settings{})

	if err != nil {
		panic(err.Error())
	}

	App.Flake = flake
}
