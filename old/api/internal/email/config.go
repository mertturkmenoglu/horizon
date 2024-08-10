package email

type (
	WithTemplateConfig[T Payload] struct {
		TemplatePath string
		Data         T
		To           string
		Subject      string
	}
)
