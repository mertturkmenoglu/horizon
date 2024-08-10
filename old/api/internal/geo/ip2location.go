package geo

import (
	"fmt"

	"github.com/ip2location/ip2location-go/v9"
	"github.com/spf13/viper"
)

type Ip2Geo struct {
	DB *ip2location.DB
}

func NewIp2Geo() *Ip2Geo {
	path := viper.GetString("api.geo.ip2locationdb")
	db, err := ip2location.OpenDB(path)

	if err != nil {
		panic("Cannot open ip2location db")
	}

	return &Ip2Geo{
		DB: db,
	}
}

func (g *Ip2Geo) GetFormattedLocationFromIp(ipaddr string) (string, error) {
	location, err := g.DB.Get_all(ipaddr)

	if err != nil {
		return "unknown location", err
	}

	city := location.City
	country := location.Country_long

	locationstr := fmt.Sprintf("%s, %s", city, country)

	return locationstr, nil
}
