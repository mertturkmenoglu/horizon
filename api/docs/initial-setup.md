# Initial Setup

## Prerequisites

- Latest Go version
- make
- Docker
- sqlc: https://sqlc.dev/
- go migration: https://github.com/golang-migrate/migrate
- air: https://github.com/air-verse/air

## Steps

- Install dependencies: `go mod download`
- Run sqlc to generate latest database queries & types: `make sqlc-generate`
- Create a `.env` file.
- Copy the content of `.env.example` file to `.env` file.
- Fill the missing values.
- Run Docker containers: `docker compose up -d`
- Run the development server: `make watch`

## Next Steps

Follow these steps in this specific order:

- Read `database.md` file.
- Read `read-location.md` file.
- Read `fake.md` file.
- Read `search-sync.md` file.