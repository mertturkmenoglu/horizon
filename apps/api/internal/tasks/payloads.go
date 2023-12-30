package tasks

const (
	TypeForgotPasswordEmail = "email:forgot-password"
	TypeWelcomeEmail        = "email:welcome"
	TypeNewLoginAlertEmail  = "email:new-login-alert"
	TypePasswordResetEmail  = "email:password-reset"
)

type TaskPayload interface {
	ForgotPasswordEmailPayload | WelcomeEmailPayload | NewLoginAlertEmailPayload | PasswordResetEmailPayload
}

type (
	ForgotPasswordEmailPayload struct {
		Email string
		Code  string
	}

	WelcomeEmailPayload struct {
		Email string
		Name  string
	}

	NewLoginAlertEmailPayload struct {
		Email string
	}

	PasswordResetEmailPayload struct {
		Email string
		Url   string
	}
)
