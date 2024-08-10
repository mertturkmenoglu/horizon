package db

import (
	"context"
	"fmt"
	"horizon/config"

	"github.com/jackc/pgx/v5"
	"github.com/spf13/viper"
)

type Db struct {
	Queries *Queries
}

func NewDb() *Db {
	ctx := context.Background()

	dbUser := viper.GetString(config.DB_USER)
	dbPassword := viper.GetString(config.DB_PASSWORD)
	dbName := viper.GetString(config.DB_NAME)

	connstr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=%s", dbUser, dbPassword, dbName, "verify-full")

	conn, err := pgx.Connect(ctx, connstr)

	if err != nil {
		panic(err.Error())
	}

	queries := New(conn)

	return &Db{
		Queries: queries,
	}
}
