package hservices

import (
	"encoding/json"
	"slices"
)

var (
	ValidTimespans  = []string{"HOURLY", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"}
	ValidPriceUnits = []string{
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
	return slices.Contains(ValidTimespans, s)
}

func isValidPriceUnit(s string) bool {
	return slices.Contains(ValidPriceUnits, s)
}

func isValidMedia(s string) bool {
	var tmp map[string]interface{}

	err := json.Unmarshal([]byte(s), &tmp)
	return err == nil
}
