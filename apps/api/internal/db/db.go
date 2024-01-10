package db

import (
	"horizon/internal/db/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var Client *gorm.DB

func Init() {
	dsn := createDsnFromEnvVars()
	logLevel := getLogLevelFromEnv()

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
		Logger:                                   logger.Default.LogMode(logLevel),
	})

	if err != nil {
		panic(err)
	}

	Client = db
}

func AutoMigrate() error {
	return Client.AutoMigrate(
		&models.Auth{},
		&models.AuthActivity{},
		&models.User{},
		&models.ContactInformation{},
		&models.Location{},
		&models.Service{},
		&models.ServicePhoto{},
		&models.ServiceVideo{},
	)
}
