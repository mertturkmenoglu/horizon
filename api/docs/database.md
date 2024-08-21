# Database

- Make sure Postgres is running.
- Install `sqlc`: `go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest`
- Install `migrate`
- Run `make create-migrations` to create a new migration.
- Run the app with `RUN_MIGRATIONS=1` environment variable to auto run migrations when app is started.
- Or, you can run `make watch` to run the app with auto migration option enabled.
- Generate Go files from your schema and query files: `sqlc generate`
