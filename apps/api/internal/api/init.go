package api

import (
	"horizon/internal/geo"
	"horizon/internal/locale"

	"github.com/spf13/viper"
)

type AppModule struct {
	Geo    *geo.GeoCoding
	Locale *locale.Locale
}

var App *AppModule

func Init() {
	App = &AppModule{
		Geo:    &geo.GeoCoding{},
		Locale: locale.New(),
	}

	// Init ip2location
	geo.New()

	// Read geocoding data
	App.Geo.LoadGeocodingDataFromFile(viper.GetString("api.geo.geocode"))
}
