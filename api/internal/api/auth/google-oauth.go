package auth

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"horizon/config"
	"horizon/internal/db"
	"horizon/internal/h"
	"horizon/internal/random"

	"github.com/gorilla/sessions"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
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

// getGoogleOAuth2Config returns the Google OAuth2 configuration.
// It reads the client ID, client secret, redirect url from Viper.
func getGoogleOAuth2Config() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     viper.GetString(config.GOOGLE_CLIENT_ID),
		ClientSecret: viper.GetString(config.GOOGLE_CLIENT_SECRET),
		RedirectURL:  viper.GetString(config.GOOGLE_CALLBACK),
		Scopes:       []string{"profile", "email"},
		Endpoint:     google.Endpoint,
	}
}

// state is used for additional OAuth2 security.
// It generates a random string of 16 bytes.
// It then encodes it to base64 URL encoding.
func generateStateString() (string, error) {
	bytes, err := random.GenerateBytes(16)

	if err != nil {
		return "", err
	}

	return base64.URLEncoding.EncodeToString(bytes), nil
}

// fetchGoogleUser fetches the user information from Google.
// Valid tokens must be obtained before calling this function.
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

	// Exchange the code for a token
	token, err := googleConfig.Exchange(context.Background(), code)

	if err != nil {
		return nil, ErrOAuthTokenExchange
	}

	return token, nil
}

func getOrCreateAuthId(s *Module, user *GoogleUser) (string, error) {
	dbAuth, err := s.Db.Queries.GetUserByGoogleId(
		context.Background(),
		pgtype.Text{String: user.Id, Valid: true},
	)

	// If there's no error, auth is found, return id
	if err == nil {
		return dbAuth.ID, nil
	}

	// If the error is not pgx.ErrNoRows, return it immediately
	if !errors.Is(err, pgx.ErrNoRows) {
		return "", err
	}

	// If there are no rows, either user doesn't exists
	// or they are using credentials login and now they logged in with
	// Google OAuth.

	// Check if the user registered with the same email address
	// they have in their Google profile. If so, merge accounts.
	auth, err := s.Db.Queries.GetUserByEmail(context.Background(), user.Email)

	if err == nil && auth.ID != "" {
		// Merge accounts
		err = s.Db.Queries.UpdateUserGoogleId(context.Background(), db.UpdateUserGoogleIdParams{
			ID:       auth.ID,
			GoogleID: pgtype.Text{String: user.Id, Valid: true},
		})

		return auth.ID, err
	}

	// User doesn't exist yet, create user
	username, err := generateUsernameFromEmail(s.Db, user.Email)

	if err != nil {
		return "", err
	}

	saved, err := s.Db.Queries.CreateUser(context.Background(), db.CreateUserParams{
		ID:              h.GenerateId(s.Flake),
		Email:           user.Email,
		Username:        username,
		FullName:        user.Name,
		PasswordHash:    pgtype.Text{},
		GoogleID:        pgtype.Text{String: user.Id, Valid: true},
		IsEmailVerified: true,
		ProfileImage:    pgtype.Text{String: user.Picture, Valid: true},
	})

	if err != nil {
		return "", err
	}

	return saved.ID, err
}
