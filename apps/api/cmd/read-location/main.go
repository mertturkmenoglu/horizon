package main

import (
	"context"
	"encoding/csv"
	"horizon/config"
	"horizon/internal/db"
	"log"
	"os"
	"strconv"

	"github.com/jackc/pgx/v5/pgtype"
)

func main() {
	config.Bootstrap()

	database := db.NewDb()
	countriesSuccess, countriesTotal := readAndInsertCountries(database)
	statesSuccess, statesTotal := readAndInsertStates(database)

	log.Printf("Countries: %d/%d", countriesSuccess, countriesTotal)
	log.Printf("States: %d/%d", statesSuccess, statesTotal)
}

func readAndInsertCountries(database *db.Db) (int, int) {
	filepath := "data/countries.csv"

	log.Println("Reading", filepath)

	file, err := os.Open(filepath)

	if err != nil {
		log.Fatal("Error while reading the file", filepath, err)
	}

	defer file.Close()

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()

	if err != nil {
		log.Fatal("Error reading records", filepath, err)
	}

	headerRow := records[0]
	const expectedFormat = "[id name iso3 iso2 numeric_code phone_code capital currency currency_name currency_symbol tld native region subregion timezones latitude longitude emoji emojiU]"
	totalItems := len(records) - 1
	successfullInserts := 0

	log.Println("Expected:", expectedFormat)
	log.Println("Actual  :", headerRow)

	for i, record := range records {
		if i == 0 {
			continue
		}

		// log.Printf("Processing record #%d\n", i)

		id, err := strconv.ParseInt(record[0], 10, 32)

		if err != nil {
			log.Printf("Error processing record #%d - ID parse: %s\n", i, err.Error())
			continue
		}

		lat, err := strconv.ParseFloat(record[15], 64)

		if err != nil {
			log.Printf("Error processing record #%d - Latitude parse: %s\n", i, err.Error())
			continue
		}

		lng, err := strconv.ParseFloat(record[16], 64)

		if err != nil {
			log.Printf("Error processing record #%d - Longitude parse: %s\n", i, err.Error())
			continue
		}

		_, err = database.Queries.CreateCountry(context.Background(), db.CreateCountryParams{
			ID:             int32(id),
			Name:           record[1],
			Iso2:           record[3],
			NumericCode:    record[4],
			PhoneCode:      record[5],
			Capital:        record[6],
			Currency:       record[7],
			CurrencyName:   record[8],
			CurrencySymbol: record[9],
			Tld:            record[10],
			Native:         record[11],
			Region:         record[12],
			Subregion:      record[13],
			Timezones:      record[14],
			Latitude:       lat,
			Longitude:      lng,
		})

		if err != nil {
			log.Printf("Error processing record #%d - Database insert: %s %s\n", i, err.Error(), record[1])
			continue
		}

		// log.Printf("Successfully inserted record #%d\n", i)

		successfullInserts++
	}

	return successfullInserts, totalItems
}

func readAndInsertStates(database *db.Db) (int, int) {
	filepath := "data/states.csv"

	log.Println("Reading", filepath)

	file, err := os.Open(filepath)

	if err != nil {
		log.Fatal("Error while reading the file", filepath, err)
	}

	defer file.Close()

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()

	if err != nil {
		log.Fatal("Error reading records", filepath, err)
	}

	headerRow := records[0]
	const expectedFormat = "[id name country_id country_code country_name state_code type latitude longitude]"
	totalItems := len(records) - 1
	successfullInserts := 0

	log.Println("Expected:", expectedFormat)
	log.Println("Actual  :", headerRow)

	for i, record := range records {
		if i == 0 {
			continue
		}

		if i%100 == 0 {
			log.Printf("Processing record #%d\n", i)
		}

		id, err := strconv.ParseInt(record[0], 10, 32)

		if err != nil {
			log.Printf("Error processing record #%d - ID parse: %s\n", i, err.Error())
			continue
		}

		countryId, err := strconv.ParseInt(record[2], 10, 32)

		if err != nil {
			log.Printf("Error processing record #%d - Country ID parse: %s\n", i, err.Error())
			continue
		}

		lat, err := strconv.ParseFloat(record[7], 64)

		if err != nil {
			continue
		}

		lng, err := strconv.ParseFloat(record[8], 64)

		if err != nil {
			continue
		}

		_, err = database.Queries.CreateState(context.Background(), db.CreateStateParams{
			ID:          int32(id),
			Name:        record[1],
			CountryID:   int32(countryId),
			CountryCode: record[3],
			CountryName: record[4],
			StateCode:   record[5],
			Type:        pgtype.Text{String: record[6]},
			Latitude:    lat,
			Longitude:   lng,
		})

		if err != nil {
			log.Printf("Error processing record #%d - Database insert: %s\n", i, err.Error())
			continue
		}

		// log.Printf("Successfully inserted record #%d\n", i)

		successfullInserts++
	}

	return successfullInserts, totalItems
}
