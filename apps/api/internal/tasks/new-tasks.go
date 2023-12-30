package tasks

import (
	"encoding/json"

	"github.com/hibiken/asynq"
)

func NewEmailForgotPasswordTask(email string, code string) (*asynq.Task, error) {
	payload, err := json.Marshal(ForgotPasswordEmailPayload{
		Email: email,
		Code:  code,
	})

	if err != nil {
		return nil, err
	}

	return asynq.NewTask(TypeForgotPasswordEmail, payload), nil
}

func NewWelcomeEmailTask(email string, name string) (*asynq.Task, error) {
	payload, err := json.Marshal(WelcomeEmailPayload{
		Email: email,
		Name:  name,
	})

	if err != nil {
		return nil, err
	}

	return asynq.NewTask(TypeWelcomeEmail, payload), nil
}

func NewLoginAlertEmailTask(email string) (*asynq.Task, error) {
	payload, err := json.Marshal(NewLoginAlertEmailPayload{
		Email: email,
	})

	if err != nil {
		return nil, err
	}

	return asynq.NewTask(TypeNewLoginAlertEmail, payload), nil
}

func PasswordResetEmailTask(email string, url string) (*asynq.Task, error) {
	payload, err := json.Marshal(PasswordResetEmailPayload{
		Email: email,
		Url:   url,
	})

	if err != nil {
		return nil, err
	}

	return asynq.NewTask(TypePasswordResetEmail, payload), nil
}
