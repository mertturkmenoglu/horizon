package api

import (
	"horizon/internal/geo"

	"github.com/spf13/viper"
)

type AppModule struct {
	Geo *geo.GeoCoding
}

var App *AppModule

func Init() {
	App = &AppModule{
		Geo: &geo.GeoCoding{},
	}

	// Init ip2location
	geo.New()

	// Read geocoding data
	App.Geo.LoadGeocodingDataFromFile(viper.GetString("api.geo.geocode"))
}
