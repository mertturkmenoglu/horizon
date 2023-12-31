package email

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/smtp"

	jwEmail "github.com/jordan-wright/email"
	"github.com/spf13/viper"
)

func SendEmail(to string, subject string, text string) error {
	cfg := getEmailConfig()
	e := jwEmail.NewEmail()
	e.From = fmt.Sprintf("%s <%s>", cfg.FromName, cfg.FromEmail)
	e.To = []string{to}
	e.Subject = subject
	e.Text = []byte(text)

	auth := smtp.PlainAuth("", cfg.SmtpEmail, cfg.SmtpPassword, viper.GetString("smtp.host"))

	err := e.Send(viper.GetString("smtp.addr"), auth)

	if err != nil {
		log.Println("Error sending email: ", err)
		return err
	}

	return nil
}

func SendEmailWithTemplate[T Payload](templateConfig WithTemplateConfig[T]) error {
	cfg := getEmailConfig()

	e := jwEmail.NewEmail()
	e.From = fmt.Sprintf("%s <%s>", cfg.FromName, cfg.FromEmail)
	e.To = []string{templateConfig.To}

	t, err := template.ParseFiles(templateConfig.TemplatePath)

	if err != nil {
		return err
	}

	var body bytes.Buffer

	err = t.Execute(&body, templateConfig.Data)

	if err != nil {
		return err
	}

	e.Subject = templateConfig.Subject
	e.HTML = body.Bytes()

	auth := smtp.PlainAuth("", cfg.SmtpEmail, cfg.SmtpPassword, viper.GetString("smtp.host"))

	err = e.Send(viper.GetString("smtp.addr"), auth)

	return err
}
