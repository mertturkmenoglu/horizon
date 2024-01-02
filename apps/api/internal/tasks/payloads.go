package tasks

const (
	TypeForgotPasswordEmail = "email:forgot-password"
	TypeWelcomeEmail        = "email:welcome"
	TypeNewLoginAlertEmail  = "email:new-login-alert"
	TypePasswordResetEmail  = "email:password-reset"
	TypeVerifyEmailEmail    = "email:verify-email"
)

type TaskPayload interface {
	ForgotPasswordEmailPayload | WelcomeEmailPayload | NewLoginAlertEmailPayload | PasswordResetEmailPayload | VerifyEmailEmailPayload
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
		Email    string
		Location string
	}

	PasswordResetEmailPayload struct {
		Email string
		Url   string
	}

	VerifyEmailEmailPayload struct {
		Email string
		Url   string
	}
)
