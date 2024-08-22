# Database

- Make sure Postgres is running.
- Install `sqlc`: `go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest`
- Install `migrate`
- Run `make create-migrations` to create a new migration.
- Run the app with `RUN_MIGRATIONS=1` environment variable to auto run migrations when app is started.
- Or, you can run `make watch` to run the app with auto migration option enabled.
- Generate Go files from your schema and query files: `sqlc generate`

# Updating the database & models & queries

- Run `make create-migrations`, give migration a name, and check `internal/db/migrations` folder for the generated migration file.
- Fill `.down.sql` and `.up.sql` files with the SQL statements to migrate the database.
- Go to `internal/db/schema.sql` and add the table definitions.
- Go to `internal/db/queries` folder and create/update the query file.
- Run `make sqlc-generate` to generate Go files from the schema and query files.
