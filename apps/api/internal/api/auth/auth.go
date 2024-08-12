package auth

import (
	"crypto/rand"
	"encoding/base64"
	"horizon/config"

	"github.com/spf13/viper"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func GenerateStateString() string {
	b := make([]byte, 16)
	_, err := rand.Read(b)

	if err != nil {
		return "horizon"
	}

	return base64.URLEncoding.EncodeToString(b)
}

func GetGoogleOAuth2Config() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     viper.GetString(config.GOOGLE_CLIENT_ID),
		ClientSecret: viper.GetString(config.GOOGLE_CLIENT_SECRET),
		RedirectURL:  viper.GetString(config.GOOGLE_CALLBACK),
		Scopes:       []string{"profile", "email"},
		Endpoint:     google.Endpoint,
	}
}

const (
	SESSION_NAME         = "__horizon_auth"
	GOOGLE_USER_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo"
)

type GoogleUser struct {
	Id            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
}
