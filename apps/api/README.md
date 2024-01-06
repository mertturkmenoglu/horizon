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
- Go to `https://lite.ip2location.com/database-download`, login (or register) and download `IP-COUNTRY-REGION-CITY` database
  - Select the `IPv4` and `BIN` version.
- Extract BIN file, rename it as `iplocation.BIN` and move it to `apps/api` (same location as this file) folder.
- Start the api server via: `air`

## Available Endpoints

- Server listens at `localhost:3000`
- Inbucket Web UI: `localhost:10000`
- Asynqmon Web UI: `localhost:8080`
- Minio Web UI: `localhost:9000`
