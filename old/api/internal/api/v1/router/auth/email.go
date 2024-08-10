package auth

import (
	"fmt"
	"horizon/internal/api"
	"horizon/internal/tasks"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
)

func sendLoginAlertEmail(to string, ip string, useragent string) error {
	location, err := api.App.Ip2Geo.GetFormattedLocationFromIp(ip)

	t, err := tasks.NewTask[tasks.NewLoginAlertEmailPayload](tasks.TypeNewLoginAlertEmail, tasks.NewLoginAlertEmailPayload{
		Email:     to,
		Location:  location,
		UserAgent: useragent,
	})

	if err != nil {
		return err
	}

	_, err = tasks.Client.Enqueue(t)

	return err
}

func sendWelcomeEmail(email string, name string) error {
	t, err := tasks.NewTask[tasks.WelcomeEmailPayload](tasks.TypeWelcomeEmail, tasks.WelcomeEmailPayload{
		Email: email,
		Name:  name,
	})

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	return err
}

func sendPasswordResetEmail(email string) error {
	key := api.App.Cache.FmtKey("passwordReset", email)
	randUuid := uuid.New().String()
	ttl := time.Minute * 15
	url := fmt.Sprintf(viper.GetString("api.auth.password.reset-url"), randUuid, email)
	_ = api.App.Cache.Set(key, randUuid, ttl)
	payload := tasks.PasswordResetEmailPayload{
		Email: email,
		Url:   url,
	}

	t, err := tasks.NewTask(tasks.TypePasswordResetEmail, payload)

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	return err
}

func sendVerifyEmailEmail(email string) error {
	key := api.App.Cache.FmtKey("verifyEmail", email)
	randUuid := uuid.New().String()
	ttl := time.Minute * 15
	url := fmt.Sprintf(viper.GetString("api.auth.email.verify-url"), randUuid, email)
	_ = api.App.Cache.Set(key, randUuid, ttl)

	t, err := tasks.NewTask(tasks.TypeVerifyEmailEmail, tasks.VerifyEmailEmailPayload{
		Email: email,
		Url:   url,
	})

	if err != nil {
		return api.NewInternalServerError(err.Error())
	}

	_, err = tasks.Client.Enqueue(t)

	return err
}
