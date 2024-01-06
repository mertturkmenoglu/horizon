package geo

import (
	"fmt"
	"log"

	"github.com/ip2location/ip2location-go/v9"
	"github.com/spf13/viper"
)

var ip2geo *ip2location.DB

// Initialize a singletion ip2location.DB instance
func New() {
	if ip2geo == nil {
		path := viper.GetString("api.geo.ip2locationdb")
		db, err := ip2location.OpenDB(path)

		if err != nil {
			log.Fatal("Cannot open ip2location db")
		}

		ip2geo = db
	}
}

// Get ip2location.DB instance.
// If instance is nil, initialize it first
func Client() *ip2location.DB {
	if ip2geo == nil {
		New()
	}
	return ip2geo
}

// Returns the formatted location as a string.
// If there's an error, returns "unknown location" as the default string.
func GetFormattedLocationFromIp(ipaddress string) (string, error) {
	location, err := Client().Get_all(ipaddress)

	if err != nil {
		return "unknown location", err
	}

	city := location.City
	country := location.Country_long

	locationstr := fmt.Sprintf("%s, %s", city, country)

	return locationstr, nil
}
