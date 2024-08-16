package hservices

import (
	"encoding/json"
	"slices"
)

var (
	validTimespans  = []string{"HOURLY", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"}
	validPriceUnits = []string{
		"USD",
		"EUR",
		"JPY",
		"GBP",
		"AUD",
		"CAD",
		"CHF",
		"INR",
		"BRL",
		"CZK",
		"TRY",
	}
)

func isValidTimespan(s string) bool {
	return slices.Contains(validTimespans, s)
}

func isValidPriceUnit(s string) bool {
	return slices.Contains(validPriceUnits, s)
}

func isValidMedia(s string) bool {
	var tmp map[string]interface{}

	err := json.Unmarshal([]byte(s), &tmp)
	return err == nil
}
