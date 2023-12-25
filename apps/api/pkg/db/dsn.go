package db

import (
	"fmt"
	"os"
)

func createDsnFromEnvVars() string {
	vars := map[string]string{
		"DB_HOST":     "",
		"DB_USER":     "",
		"DB_PASSWORD": "",
		"DB_NAME":     "",
		"DB_PORT":     "",
		"DB_TIMEZONE": "",
	}

	for key := range vars {
		vars[key] = os.Getenv(key)
	}

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s",
		vars["DB_HOST"],
		vars["DB_USER"],
		vars["DB_PASSWORD"],
		vars["DB_NAME"],
		vars["DB_PORT"],
		vars["DB_TIMEZONE"],
	)

	return dsn
}
