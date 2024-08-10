package esearch

import "github.com/elastic/go-elasticsearch/v8/typedapi/core/get"

func (s *Search) GetServiceById(id string) (*get.Response, error) {
	return s.Client.Get(IndexService, id).Do(s.Context)
}
