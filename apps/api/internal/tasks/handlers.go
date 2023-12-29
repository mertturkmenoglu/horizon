package tasks

import (
	"context"
	"encoding/json"
	"fmt"
	"horizon/internal/email"
	"time"

	"github.com/hibiken/asynq"
)

func HandleEmailForgotPasswordTask(_ context.Context, t *asynq.Task) error {
	var p ForgotPasswordEmailPayload

	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		return fmt.Errorf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
	}

	err := email.SendEmailWithTemplate(email.WithTemplateConfig[email.ForgotPasswordPayload]{
		To:           p.Email,
		TemplatePath: "templates/forgot-password.html",
		Subject:      "Reset your password",
		Data: email.ForgotPasswordPayload{
			Code: p.Code,
		},
	})

	return err
}

func HandleWelcomeEmailTask(_ context.Context, t *asynq.Task) error {
	var p WelcomeEmailPayload

	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		return fmt.Errorf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
	}

	err := email.SendEmailWithTemplate(email.WithTemplateConfig[email.WelcomePayload]{
		To:           p.Email,
		TemplatePath: "templates/welcome.html",
		Subject:      "Welcome to Horizon",
		Data: email.WelcomePayload{
			Name: p.Name,
		},
	})

	return err
}

func HandleNewLoginAlertEmailTask(_ context.Context, t *asynq.Task) error {
	var p NewLoginAlertEmailPayload

	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		return fmt.Errorf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
	}

	err := email.SendEmailWithTemplate(email.WithTemplateConfig[email.NewLoginAlertPayload]{
		To:           p.Email,
		TemplatePath: "templates/new-login-alert.html",
		Subject:      "New Login to Your Horizon Account",
		Data: email.NewLoginAlertPayload{
			Date: time.Now().Format("2006-01-02T15:04"),
		},
	})

	return err
}
