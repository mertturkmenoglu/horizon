package tasks

import (
	"context"
	"horizon/internal/email"
	"time"

	"github.com/hibiken/asynq"
)

func HandleEmailForgotPasswordTask(_ context.Context, t *asynq.Task) error {
	p, err := parse[ForgotPasswordEmailPayload](t.Payload())

	if err != nil {
		return err
	}

	return email.SendEmailWithTemplate(email.WithTemplateConfig[email.ForgotPasswordPayload]{
		To:           p.Email,
		TemplatePath: "templates/forgot-password.html",
		Subject:      "Reset your password",
		Data: email.ForgotPasswordPayload{
			Code: p.Code,
		},
	})
}

func HandleWelcomeEmailTask(_ context.Context, t *asynq.Task) error {
	p, err := parse[WelcomeEmailPayload](t.Payload())

	if err != nil {
		return err
	}

	return email.SendEmailWithTemplate(email.WithTemplateConfig[email.WelcomePayload]{
		To:           p.Email,
		TemplatePath: "templates/welcome.html",
		Subject:      "Welcome to Horizon",
		Data: email.WelcomePayload{
			Name: p.Name,
		},
	})
}

func HandleNewLoginAlertEmailTask(_ context.Context, t *asynq.Task) error {
	p, err := parse[NewLoginAlertEmailPayload](t.Payload())

	if err != nil {
		return err
	}

	return email.SendEmailWithTemplate(email.WithTemplateConfig[email.NewLoginAlertPayload]{
		To:           p.Email,
		TemplatePath: "templates/new-login-alert.html",
		Subject:      "New Login to Your Horizon Account",
		Data: email.NewLoginAlertPayload{
			Date: time.Now().Format("2006-01-02T15:04"),
		},
	})
}

func HandlePasswordResetEmailTask(_ context.Context, t *asynq.Task) error {
	p, err := parse[PasswordResetEmailPayload](t.Payload())

	if err != nil {
		return err
	}

	return email.SendEmailWithTemplate(email.WithTemplateConfig[email.PasswordResetPayload]{
		To:           p.Email,
		TemplatePath: "templates/password-reset.html",
		Subject:      "Reset Your Horizon Password",
		Data: email.PasswordResetPayload{
			Url: p.Url,
		},
	})
}
