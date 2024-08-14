package auth

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"horizon/config"

	"github.com/gorilla/sessions"
	"github.com/spf13/viper"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
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

func getGoogleOAuth2Config() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     viper.GetString(config.GOOGLE_CLIENT_ID),
		ClientSecret: viper.GetString(config.GOOGLE_CLIENT_SECRET),
		RedirectURL:  viper.GetString(config.GOOGLE_CALLBACK),
		Scopes:       []string{"profile", "email"},
		Endpoint:     google.Endpoint,
	}
}

func generateStateString() string {
	b := make([]byte, 16)
	_, err := rand.Read(b)

	if err != nil {
		return "horizon"
	}

	return base64.URLEncoding.EncodeToString(b)
}

func fetchGoogleUser(token *oauth2.Token) (*GoogleUser, error) {
	googleConfig := getGoogleOAuth2Config()
	client := googleConfig.Client(context.Background(), token)
	res, err := client.Get(GOOGLE_USER_ENDPOINT)

	if err != nil {
		return nil, ErrOAuthFailedUserFetch
	}

	defer res.Body.Close()

	userInfo := GoogleUser{}

	if err := json.NewDecoder(res.Body).Decode(&userInfo); err != nil {
		return nil, ErrOAuthInvalidUserResp
	}

	return &userInfo, nil
}

func getOAuthToken(sess *sessions.Session, receivedState string, code string) (*oauth2.Token, error) {
	googleConfig := getGoogleOAuth2Config()
	savedState, ok := sess.Values["state"].(string)

	if !ok || savedState == "" {
		return nil, ErrInvalidSessionState
	}

	if receivedState != savedState {
		return nil, ErrInvalidStateParameter
	}

	token, err := googleConfig.Exchange(context.Background(), code)

	if err != nil {
		return nil, ErrOAuthTokenExchange
	}

	return token, nil
}
