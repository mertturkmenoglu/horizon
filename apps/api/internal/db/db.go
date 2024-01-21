package db

import (
	"horizon/internal/models"

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
		PrepareStmt:                              true,
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
		&models.Favorite{},
		&models.Location{},
		&models.Service{},
		&models.ServicePhoto{},
		&models.ServiceReview{},
		&models.ServiceVideo{},
	)
}
