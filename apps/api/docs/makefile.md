# Makefile

- We are using makefile to make typing CLI commands and remembering things easier.
- An example usage: `make watch`

## Make Commands

- `all`: Alias to build.
- `build`: Builds the main app and creates a single executable binary `main`.
- `run`: Runs the main app without live reload.
- `clean`: Removes `main` binary.
- `watch`: Runs the main app with live reload (you probably want to use this command during local development).
- `read-location`: Runs `read-location` app. Read `read-location.md` for more details.
- `generate-fake-data`: Runs `fake` app. Read `fake.md` for more details.
- `sqlc-generate`: Runs `sqlc generate` command. It's more conveniant to rely on make & bash autocomplete to remember this command, that's why it's there.
- `create-migration`: Reads the migration name from terminal and rungs `go-migrate`. Read `migrations.md` for more details.