package email

type Payload interface {
	WelcomePayload | ForgotPasswordPayload
}

type (
	ForgotPasswordPayload struct {
		Code string
	}

	WelcomePayload struct {
		Name string
	}
)
