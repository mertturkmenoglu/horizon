package api

import (
	"fmt"
	"horizon/config"
	"horizon/internal/db"
	"horizon/internal/logs"
	"horizon/internal/upload"

	"github.com/sony/sonyflake"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

type App struct {
	Port       int
	PortString string
	Upload     *upload.Upload
	Logger     *zap.Logger
	Flake      *sonyflake.Sonyflake
	Db         *db.Db
}

func New() *App {
	apiObj := &App{
		Upload:     upload.New(),
		Flake:      nil,
		Logger:     logs.New(),
		Port:       viper.GetInt(config.PORT),
		PortString: fmt.Sprintf(":%d", viper.GetInt(config.PORT)),
		Db:         db.NewDb(),
	}

	flake, err := sonyflake.New(sonyflake.Settings{})

	if err != nil {
		panic(err.Error())
	}

	apiObj.Flake = flake

	return apiObj
}
