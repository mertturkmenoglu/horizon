package email

type Payload interface {
	WelcomePayload | ForgotPasswordPayload | NewLoginAlertPayload | PasswordResetPayload
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

	PasswordResetPayload struct {
		Url string
	}
)
