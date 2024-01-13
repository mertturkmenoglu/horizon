package esearch

const (
	IndexService string = "service"
)

func (s *Search) CreateIndices() {
	s.Client.Indices.Create(IndexService).Do(s.Context)
}
