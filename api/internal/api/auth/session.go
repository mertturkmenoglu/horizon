package auth

import (
	"horizon/config"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/spf13/viper"
)

func getAuthSessionOptions() *sessions.Options {
	return &sessions.Options{
		Path:     viper.GetString(config.AUTH_SESSION_PATH),
		MaxAge:   viper.GetInt(config.AUTH_SESSION_MAX_AGE),
		HttpOnly: true,
		Secure:   viper.GetString(config.ENV) != "dev",
		SameSite: http.SameSiteLaxMode,
	}
}
