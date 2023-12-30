package email

type Payload interface {
	WelcomePayload | ForgotPasswordPayload | NewLoginAlertPayload | PasswordResetPayload | VerifyEmailPayload
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

	VerifyEmailPayload struct {
		Url string
	}
)
