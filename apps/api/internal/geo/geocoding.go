package geo

import (
	"encoding/json"
	"os"
	"slices"

	"github.com/adrg/strutil"
	"github.com/adrg/strutil/metrics"
)

type GeoLocation struct {
	Id      string           `json:"id"`
	Name    string           `json:"name"`
	Lat     string           `json:"lat"`
	Long    string           `json:"long"`
	Country string           `json:"country"`
	Admin   GeoLocationAdmin `json:"admin"`
}

type GeoLocationAdmin struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type SearchResult struct {
	Similarity float64     `json:"similarity"`
	Entry      GeoLocation `json:"entry"`
}

var data []GeoLocation = []GeoLocation{}

const minSimilarity = 0.5

func LoadGeocodingDataFromFile(path string) error {
	bytes, err := os.ReadFile(path)

	if err != nil {
		return err
	}

	return json.Unmarshal(bytes, &data)
}

func SearchAll(term string) []SearchResult {
	similars := make([]SearchResult, 0)
	m := metrics.NewLevenshtein()

	for _, entry := range data {
		nameSimScore := strutil.Similarity(term, entry.Name, m)
		adminSimScore := strutil.Similarity(term, entry.Admin.Name, m)
		maxSimScore := -1.0

		if adminSimScore > nameSimScore {
			maxSimScore = adminSimScore
		} else {
			maxSimScore = nameSimScore
		}

		if maxSimScore >= minSimilarity {
			similars = append(similars, SearchResult{
				Similarity: maxSimScore,
				Entry:      entry,
			})
		}
	}

	slices.SortFunc(similars, func(a, b SearchResult) int {
		if a.Similarity > b.Similarity {
			return -1
		}

		if a.Similarity < b.Similarity {
			return 1
		}

		return 0
	})

	maxLen := 10

	if len(similars) < maxLen {
		maxLen = len(similars)
	}

	return similars[:maxLen]
}
