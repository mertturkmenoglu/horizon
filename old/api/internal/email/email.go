package email

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"

	jwEmail "github.com/jordan-wright/email"
	"github.com/spf13/viper"
)

func SendEmail(to string, subject string, text string) error {
	e := initEmail(to, subject)
	addr := viper.GetString("smtp.addr")
	auth := getAuth()

	e.Text = []byte(text)

	err := e.Send(addr, auth)

	if err != nil {
		return err
	}

	return nil
}

func SendEmailWithTemplate[T Payload](cfg WithTemplateConfig[T]) error {
	e := initEmail(cfg.To, cfg.Subject)
	addr := viper.GetString("smtp.addr")
	auth := getAuth()

	body, err := getHtmlBody(cfg)

	if err != nil {
		return err
	}

	e.HTML = body

	err = e.Send(addr, auth)

	return err
}

func initEmail(to string, subject string) *jwEmail.Email {
	from := viper.GetString("email.name")
	fromEmail := viper.GetString("email.from")
	e := jwEmail.NewEmail()
	e.From = fmt.Sprintf("%s <%s>", from, fromEmail)
	e.To = []string{to}
	e.Subject = subject
	return e
}

func getHtmlBody[T Payload](templateConfig WithTemplateConfig[T]) ([]byte, error) {
	t, err := template.ParseFiles(templateConfig.TemplatePath)

	if err != nil {
		return nil, err
	}

	var body bytes.Buffer

	err = t.Execute(&body, templateConfig.Data)

	if err != nil {
		return nil, err
	}

	return body.Bytes(), nil
}

func getAuth() smtp.Auth {
	identity := viper.GetString("smtp.identity")
	username := viper.GetString("smtp.username")
	password := viper.GetString("smtp.password")
	host := viper.GetString("smtp.host")
	return smtp.PlainAuth(identity, username, password, host)
}
