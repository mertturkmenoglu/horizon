package email

type Payload interface {
	WelcomePayload | ForgotPasswordPayload | NewLoginAlertPayload
}

type (
	ForgotPasswordPayload struct {
		Code string
	}

	WelcomePayload struct {
		Name string
	}

	NewLoginAlertPayload struct {
		Date string
	}
)
