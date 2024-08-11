# Database

- Make sure Postgres is running.
- Install `sqlc`
- Install `migrate`
- Run `migrate create -ext sql -dir internal/db/migrations -seq create_users_table` to generate `up` and `down` migration files with `.sql` extension.
- Run the app with `RUN_MIGRATIONS=1` environment variable to auto run migrations when app is started.
