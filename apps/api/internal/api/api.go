package api

import (
	"horizon/internal/cache"
	"horizon/internal/geo"
	"horizon/internal/locale"
	"horizon/internal/upload"

	"github.com/sony/sonyflake"
)

type AppModule struct {
	Geo    *geo.GeoCoding
	Ip2Geo *geo.Ip2Geo
	Locale *locale.Locale
	Cache  *cache.Cache
	Flake  *sonyflake.Sonyflake
	Upload *upload.Upload
}

var App *AppModule

func Init() {
	App = &AppModule{
		Geo:    geo.NewGeoCoding(0.5),
		Locale: locale.New(),
		Cache:  cache.New(),
		Flake:  nil,
		Ip2Geo: geo.NewIp2Geo(),
		Upload: upload.New(),
	}

	// Initialize Sonyflake
	flake, err := sonyflake.New(sonyflake.Settings{})

	if err != nil {
		panic(err.Error())
	}

	App.Flake = flake
}
