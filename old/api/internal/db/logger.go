package db

import (
	"github.com/spf13/viper"
	"gorm.io/gorm/logger"
)

func getLogLevelFromEnv() logger.LogLevel {
	lvl := logger.Silent
	debug := viper.GetBool("debug")

	if debug {
		lvl = logger.Info
	}

	return lvl
}
