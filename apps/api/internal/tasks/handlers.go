package tasks

import (
	"context"
	"encoding/json"
	"fmt"
	"horizon/internal/email"

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
