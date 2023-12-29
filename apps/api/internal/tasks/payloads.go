package tasks

type ForgotPasswordEmailPayload struct {
	Email string
	Code  string
}

type WelcomeEmailPayload struct {
	Email string
	Name  string
}
