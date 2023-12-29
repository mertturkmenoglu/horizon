package email

import "os"

type (
	Config struct {
		FromName     string
		FromEmail    string
		SmtpEmail    string
		SmtpPassword string
	}

	WithTemplateConfig[T Payload] struct {
		TemplatePath string
		Data         T
		To           string
		Subject      string
	}
)

func getEmailConfig() Config {
	fromName, fromNameOk := os.LookupEnv("EMAIL_FROM_NAME")
	fromEmail, fromEmailOk := os.LookupEnv("EMAIL_FROM_EMAIL")
	smtpEmail, smtpEmailOk := os.LookupEnv("SMTP_EMAIL")
	smtpPassword, smtpPasswordOk := os.LookupEnv("SMTP_PASSWORD")

	if !fromNameOk || !fromEmailOk || !smtpEmailOk || !smtpPasswordOk {
		panic("Email environment variables are not set")
	}

	return Config{
		FromName:     fromName,
		FromEmail:    fromEmail,
		SmtpEmail:    smtpEmail,
		SmtpPassword: smtpPassword,
	}
}
