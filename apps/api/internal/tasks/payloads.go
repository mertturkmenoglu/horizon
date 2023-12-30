package tasks

type ForgotPasswordEmailPayload struct {
	Email string
	Code  string
}

type WelcomeEmailPayload struct {
	Email string
	Name  string
}

type NewLoginAlertEmailPayload struct {
	Email string
}

type PasswordResetEmailPayload struct {
	Email string
	Url   string
}
