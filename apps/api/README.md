# Horizon - API

## Requirements

- Go 1.21.0
- Docker

## Installation and Running

- Clone the repository.
- Get Air: `go install github.com/cosmtrek/air@latest`
- Add Air executable to your shell profile as an alias: `air`
- Build and run Docker containers: `docker compose up`
- Run `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` for your database to setup `uuid_generate_v4` extension.
- Create a `.env` file inside the root API folder.
- Copy `.env.example` content into `.env` file.
- Fill all values.
- Start the api server via: `air`
