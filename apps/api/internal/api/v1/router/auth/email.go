package auth

import (
	"horizon/internal/api"
	"horizon/internal/tasks"
	"net/http"

	"github.com/labstack/echo/v4"
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
