# Fake Data Generation

## Prerequisites

- Make sure your database is up and running.

## Running

- Run `make generate-fake-data` command.
- Follow the on screen instructions to generate fake data.
- First you must select the type of fake data you want to generate.
- Example types:
  - `user`
  - `hservice`
- Select a type.
- Type how many items of this type you want to generate.
- Generating data for some types may require additional information. Follow on screen instructions and enter any required value to continue generating fake data.
- When you enter all the necessary values, script will generate data and insert it to the database.
- Script completes generating and inserting an item before it proceeds to the next item.
- Any error encountered during generating/inserting an item will terminate the script.
- Previously generated and successfully inserted data will be untouched, it will still be on the database.
