package api

import (
	"horizon/internal/cache"
	"horizon/internal/geo"
	"horizon/internal/locale"

	"github.com/spf13/viper"
)

type AppModule struct {
	Geo    *geo.GeoCoding
	Locale *locale.Locale
	Cache  *cache.Cache
}

var App *AppModule

func Init() {
	App = &AppModule{
		Geo:    &geo.GeoCoding{},
		Locale: locale.New(),
		Cache:  cache.New(),
	}

	// Init ip2location
	geo.New()

	// Read geocoding data
	App.Geo.LoadGeocodingDataFromFile(viper.GetString("api.geo.geocode"))
}
