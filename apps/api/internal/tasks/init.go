package tasks

import (
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
	mux.HandleFunc(TypeForgotPasswordEmail, HandleEmailForgotPasswordTask)
	mux.HandleFunc(TypeNewLoginAlertEmail, HandleNewLoginAlertEmailTask)
	mux.HandleFunc(TypeWelcomeEmail, HandleWelcomeEmailTask)
	mux.HandleFunc(TypePasswordResetEmail, HandlePasswordResetEmailTask)

	if err := srv.Run(mux); err != nil {
		log.Fatalf("could not run asynq server: %v", err)
	}
}

func Close() {
	err := Client.Close()

	if err != nil {
		log.Fatalf("could not close asynq client: %v", err)
	}
}
