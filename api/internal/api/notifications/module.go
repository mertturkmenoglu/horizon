package notifications

type Module struct {
	handlers *handlers
}

type handlers struct {
	service *service
}

type service struct {
	repository *repository
}

type repository struct {
}

func New() *Module {
	repository := repository{}

	service := service{
		repository: &repository,
	}

	handlers := &handlers{
		service: &service,
	}

	return &Module{
		handlers: handlers,
	}
}
