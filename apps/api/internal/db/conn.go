package db

import (
	"context"

	"github.com/jackc/pgx/v5"
)

type Db struct {
	Queries *Queries
}

func NewDb() *Db {
	ctx := context.Background()
	dsn := getDsnFromEnv()
	conn, err := pgx.Connect(ctx, dsn)

	if err != nil {
		panic(err.Error())
	}

	queries := New(conn)

	return &Db{
		Queries: queries,
	}
}
