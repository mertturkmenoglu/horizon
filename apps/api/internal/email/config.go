package email

import (
	"github.com/spf13/viper"
)

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
	return Config{
		FromName:     viper.GetString("email.name"),
		FromEmail:    viper.GetString("email.from"),
		SmtpEmail:    viper.GetString("smtp.email"),
		SmtpPassword: viper.GetString("smtp.password"),
	}
}
