package auth

import (
	"horizon/config"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/spf13/viper"
)

func getAuthSessionOptions() *sessions.Options {
	return &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
		Secure:   viper.GetString(config.ENV) != "dev",
		SameSite: http.SameSiteLaxMode,
	}
}
