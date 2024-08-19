package health

type HealthService struct{}

func NewHealthService() *HealthService {
	return &HealthService{}
}
