package tasks

import (
	"encoding/json"
	"log"
	"os"

	"github.com/hibiken/asynq"
)

var Client *asynq.Client

func Init() {
	redisAddr := os.Getenv("REDIS_ADDR")
	Client = asynq.NewClient(asynq.RedisClientOpt{
		Addr: redisAddr,
	})

	srv := asynq.NewServer(
		asynq.RedisClientOpt{Addr: redisAddr},
		asynq.Config{
			Concurrency: 10,
		},
	)

	mux := asynq.NewServeMux()

	bootstrap(mux)

	if err := srv.Run(mux); err != nil {
		log.Fatalf("could not run asynq server: %v", err)
	}
}

func bootstrap(mux *asynq.ServeMux) {
	mux.HandleFunc(TypeForgotPasswordEmail, HandleEmailForgotPasswordTask)
	mux.HandleFunc(TypeNewLoginAlertEmail, HandleNewLoginAlertEmailTask)
	mux.HandleFunc(TypeWelcomeEmail, HandleWelcomeEmailTask)
	mux.HandleFunc(TypePasswordResetEmail, HandlePasswordResetEmailTask)
	mux.HandleFunc(TypeVerifyEmailEmail, HandleVerifyEmailEmailTask)
}

func Close() {
	err := Client.Close()

	if err != nil {
		log.Fatalf("could not close asynq client: %v", err)
	}
}

func NewTask[T TaskPayload](taskType string, payload T) (*asynq.Task, error) {
	serialized, err := json.Marshal(payload)

	if err != nil {
		return nil, err
	}

	return asynq.NewTask(taskType, serialized), nil
}

func parse[T TaskPayload](serialized []byte) (*T, error) {
	var p T

	err := json.Unmarshal(serialized, &p)

	if err != nil {
		return nil, err
	}

	return &p, nil
}
