# Read Location

- This app reads `countries` and `states` information in, and inserts data to database.

## Prerequisites

- Make sure you have the `data` folder.
- Full path relative to repository root is: `apps/api/data`.
- Make sure you have the `countries.csv` and `states.csv` files inside this folder.
- Expected format of these files are printed on the terminal when you run the app. You can also review the code to find them.

## Running

- Run `make read-location` command to start the app.
- Some of the states may have produce errors because they don't have lat/lon values. It's normal.
