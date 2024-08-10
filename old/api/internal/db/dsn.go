package db

import (
	"fmt"

	"github.com/spf13/viper"
)

func createDsnFromEnvVars() string {
	vars := map[string]string{
		"db.host":     "",
		"db.user":     "",
		"db.password": "",
		"db.name":     "",
		"db.port":     "",
		"db.timezone": "",
	}

	for key := range vars {
		vars[key] = viper.GetString(key)

	}

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s",
		vars["db.host"],
		vars["db.user"],
		vars["db.password"],
		vars["db.name"],
		vars["db.port"],
		vars["db.timezone"],
	)

	return dsn
}
