package api

import (
	"horizon/internal/cache"
	"horizon/internal/geo"
	"horizon/internal/locale"

	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
)

type AppModule struct {
	Geo    *geo.GeoCoding
	Locale *locale.Locale
	Cache  *cache.Cache
	Flake  *sonyflake.Sonyflake
}

var App *AppModule

func Init() {
	App = &AppModule{
		Geo:    &geo.GeoCoding{},
		Locale: locale.New(),
		Cache:  cache.New(),
		Flake:  nil,
	}

	// Init ip2location
	geo.New()

	// Read geocoding data
	App.Geo.LoadGeocodingDataFromFile(viper.GetString("api.geo.geocode"))

	// Initialize Sonyflake
	flake, err := sonyflake.New(sonyflake.Settings{})

	if err != nil {
		panic(err.Error())
	}

	App.Flake = flake
}
