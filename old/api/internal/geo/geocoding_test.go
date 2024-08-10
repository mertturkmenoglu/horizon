package geo_test

import (
	"horizon/internal/geo"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type GeoCodingSuite struct {
	suite.Suite
	Data []geo.GeoLocation
}

func (s *GeoCodingSuite) SetupTest() {
	s.Data = []geo.GeoLocation{
		{Id: "2643743", Name: "London", Lat: "51.50853", Long: "-0.12574", Country: "GB", Admin: geo.GeoLocationAdmin{
			Id:   "GB.ENG",
			Name: "England",
		}},
		{Id: "745044", Name: "Istanbul", Lat: "41.01384", Long: "28.94966", Country: "TR", Admin: geo.GeoLocationAdmin{
			Id:   "TR.34",
			Name: "Istanbul",
		}},
	}
}

func (s *GeoCodingSuite) TestSearchAllShouldFind() {
	gc := geo.GeoCoding{Data: s.Data}
	res := gc.SearchAll("London")
	assert.Equal(s.T(), "London", res[0].Entry.Name)
}

func TestRunGeoCodingSuite(t *testing.T) {
	suite.Run(t, new(GeoCodingSuite))
}

func TestSomething(t *testing.T) {
	assert.True(t, true, "True is true!")
}
