package api

import (
	"horizon/internal/cache"
	"horizon/internal/esearch"
	"horizon/internal/geo"
	"horizon/internal/locale"
	"horizon/internal/upload"
	"os"

	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
	"go.elastic.co/ecszap"
	"go.uber.org/zap"
)

type AppModule struct {
	Geo    *geo.GeoCoding
	Ip2Geo *geo.Ip2Geo
	Locale *locale.Locale
	Cache  *cache.Cache
	Flake  *sonyflake.Sonyflake
	Upload *upload.Upload
	Search *esearch.Search
	Logger *zap.Logger
}

var App *AppModule

func Init() {
	App = &AppModule{
		Geo:    geo.NewGeoCoding(0.5),
		Locale: locale.New(),
		Cache:  cache.New(),
		Ip2Geo: geo.NewIp2Geo(),
		Upload: upload.New(),
		Search: esearch.New(),
		Flake:  nil,
		Logger: nil,
	}

	App.Search.CreateIndices()

	// Initialize Sonyflake
	flake, err := sonyflake.New(sonyflake.Settings{})

	if err != nil {
		panic(err.Error())
	}

	App.Flake = flake

	loggerType := viper.GetString("api.logger.type")

	if loggerType == "file" {
		cfg := zap.NewProductionConfig()
		cfg.OutputPaths = []string{
			"horizon.log",
		}
		logger, err := cfg.Build()
		_, err = os.OpenFile("horizon.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			panic(err)
		}

		if err != nil {
			panic(err.Error())
		}

		defer logger.Sync()

		App.Logger = logger
	} else {
		encoderConfig := ecszap.NewDefaultEncoderConfig()
		core := ecszap.NewCore(encoderConfig, os.Stdout, zap.DebugLevel)
		eclogger := zap.New(core, zap.AddCaller())
		App.Logger = eclogger
	}
}
