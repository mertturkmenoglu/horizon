package auth

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"horizon/config"
	"horizon/internal/db"
	"horizon/internal/hash"
	"horizon/internal/random"
	"net/http"
	"time"

	"github.com/gorilla/sessions"
	"github.com/jackc/pgx/v5"
	"github.com/spf13/viper"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func (s *service) resetCookie() *http.Cookie {
	cookie := new(http.Cookie)
	cookie.Name = SESSION_NAME
	cookie.Value = ""
	cookie.Path = "/"
	cookie.Expires = time.Unix(0, 0)
	cookie.MaxAge = -1

	return cookie
}

// exchange the code for an OAuth2 token
// that can be used to fetch the user information
func (s *service) getOAuthToken(sess *sessions.Session, receivedState string, code string) (*oauth2.Token, error) {
	googleConfig := s.getGoogleOAuth2Config()
	savedState, ok := sess.Values["state"].(string)

	if !ok || savedState == "" {
		return nil, errInvalidSessionState
	}

	if receivedState != savedState {
		return nil, errInvalidStateParameter
	}

	// Exchange the code for a token
	token, err := googleConfig.Exchange(context.Background(), code)

	if err != nil {
		return nil, errOAuthTokenExchange
	}

	return token, nil
}

// fetchGoogleUser fetches the user information from Google.
// Valid tokens must be obtained before calling this function.
func (s *service) fetchGoogleUser(token *oauth2.Token) (*googleUser, error) {
	googleConfig := s.getGoogleOAuth2Config()
	client := googleConfig.Client(context.Background(), token)
	res, err := client.Get(GOOGLE_USER_ENDPOINT)

	if err != nil {
		return nil, errOAuthFailedUserFetch
	}

	defer res.Body.Close()

	userInfo := googleUser{}

	if err := json.NewDecoder(res.Body).Decode(&userInfo); err != nil {
		return nil, errOAuthInvalidUserResp
	}

	return &userInfo, nil
}

// getGoogleOAuth2Config returns the Google OAuth2 configuration.
// It reads the client ID, client secret, redirect url from Viper.
func (s *service) getGoogleOAuth2Config() *oauth2.Config {
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
func (s *service) generateStateString() (string, error) {
	bytes, err := random.Bytes(16)

	if err != nil {
		return "", err
	}

	return base64.URLEncoding.EncodeToString(bytes), nil
}

func (s *service) getOAuthStateAndRedirectUrl() (string, string, error) {
	cfg := s.getGoogleOAuth2Config()
	state, err := s.generateStateString()

	if err != nil {
		return "", "", err
	}

	url := cfg.AuthCodeURL(state, oauth2.ApprovalForce)
	return state, url, nil
}

func (s *service) getOrCreateUserId(user *googleUser) (string, error) {
	dbUser, err := s.repository.getUserByGoogleId(user.Id)

	// If there's no error, user is found, return id
	if err == nil {
		return dbUser.ID, nil
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
	dbUser, err = s.repository.getUserByEmail(user.Email)

	if err == nil && dbUser.ID != "" {
		// Merge accounts
		err = s.repository.updateUserGoogleId(dbUser.ID, user.Id)

		return dbUser.ID, err
	}

	// User doesn't exist yet, create user
	savedId, err := s.repository.createUser(user)

	if err != nil {
		return "", err
	}

	return savedId, nil
}

func (s *service) createSession(sessionId string, userId string) error {
	return s.repository.createSession(sessionId, userId)
}

func (s *service) getUserByEmail(email string) (db.User, error) {
	return s.repository.getUserByEmail(email)
}

func (s *service) getUserByUsername(username string) (db.User, error) {
	return s.repository.getUserByUsername(username)
}

func (s *service) createUserFromCredentialsInfo(dto RegisterRequestDto) (*db.User, error) {
	return s.repository.createUserFromCredentialsInfo(dto)
}

func (s *service) checkIfEmailOrUsernameIsTaken(email string, username string) error {
	// Check if email is taken
	dbUser, err := s.getUserByEmail(email)

	if err == nil && dbUser.Email != "" {
		return errEmailTaken
	}

	// Check if username is taken
	dbUser, err = s.getUserByUsername(username)

	if err == nil && dbUser.Username != "" {
		return errUsernameTaken
	}

	return nil
}

func (s *service) getEmailVerifyUrl(code string) string {
	return fmt.Sprintf(
		"%s/api/auth/verify-email/verify?code=%s",
		viper.GetString(config.API_URL),
		code,
	)
}

func (s *service) verifyUserEmail(userId string) error {
	return s.repository.verifyUserEmail(userId)
}

func (s *service) updateUserPassword(userId string, plainPassword string) error {
	hashed, err := hash.Hash(plainPassword)

	if err != nil {
		return errHash
	}

	return s.repository.updateUserPassword(userId, hashed)
}
