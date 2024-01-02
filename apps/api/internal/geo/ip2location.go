package geo

import (
	"fmt"
	"log"

	"github.com/ip2location/ip2location-go/v9"
	"github.com/spf13/viper"
)

var Ip2GeoDb *ip2location.DB

func New() {
	if Ip2GeoDb == nil {
		path := viper.GetString("api.geo.ip2locationdb")
		db, err := ip2location.OpenDB(path)

		if err != nil {
			log.Fatal("Cannot open ip2location db")
		}

		Ip2GeoDb = db
	}
}

func Client() *ip2location.DB {
	if Ip2GeoDb == nil {
		New()
	}
	return Ip2GeoDb
}

func GetFormattedLocation(ipaddress string) (string, error) {
	location, err := Client().Get_all(ipaddress)

	if err != nil {
		return "unknown location", err
	}

	city := location.City
	country := location.Country_long

	locationstr := fmt.Sprintf("%s, %s", city, country)

	return locationstr, nil
}
