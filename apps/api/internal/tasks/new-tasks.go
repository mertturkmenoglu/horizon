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
