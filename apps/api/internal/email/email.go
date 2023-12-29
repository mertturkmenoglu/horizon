package email

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/smtp"

	jwEmail "github.com/jordan-wright/email"
)

func SendEmail(to string, subject string, text string) error {
	cfg := getEmailConfig()
	e := jwEmail.NewEmail()
	e.From = fmt.Sprintf("%s <%s>", cfg.FromName, cfg.FromEmail)
	e.To = []string{to}
	e.Subject = subject
	e.Text = []byte(text)

	auth := smtp.PlainAuth("", cfg.SmtpEmail, cfg.SmtpPassword, "smtp.gmail.com")

	err := e.Send("smtp.gmail.com:587", auth)

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

	auth := smtp.PlainAuth("", cfg.SmtpEmail, cfg.SmtpPassword, "smtp.gmail.com")

	err = e.Send("smtp.gmail.com:587", auth)

	return err
}
