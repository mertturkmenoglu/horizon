package auth

import (
	"fmt"
	"horizon/internal/api"
	"horizon/internal/models"
	"horizon/internal/jsonwebtoken"
	"time"

	"github.com/google/uuid"
	"github.com/spf13/viper"
)

type Tokens struct {
	AccessToken  string
	RefreshToken string
	AccessExp    time.Time
	RefreshExp   time.Time
}

func createNewTokens(auth *models.Auth, user *models.User) (*Tokens, error) {
	access, accExp, accErr := createNewAccessToken(auth, user)
	refresh, refExp, refErr := createNewRefreshToken(user.Email)

	if accErr != nil || refErr != nil {
		return nil, api.NewInternalServerError("Cannot create token")
	}

	return &Tokens{
		AccessToken:  access,
		RefreshToken: refresh,
		AccessExp:    accExp,
		RefreshExp:   refExp,
	}, nil
}

func createNewAccessToken(auth *models.Auth, user *models.User) (string, time.Time, error) {
	ttl := time.Duration(viper.GetInt64("api.auth.token.access-ttl")) * time.Minute
	exp := time.Now().Add(ttl)
	token, err := jsonwebtoken.Encode(jsonwebtoken.Payload{
		AuthId: auth.Id.String(),
		UserId: user.Id.String(),
		Name:   user.Name,
		Email:  user.Email,
	}, exp)
	return token, exp, err
}

func createNewRefreshToken(email string) (string, time.Time, error) {
	token := uuid.New().String()
	key := fmt.Sprintf("refreshToken:%s", token)
	ttl := time.Minute * time.Duration(viper.GetInt64("api.auth.token.refresh-ttl"))
	exp := time.Now().Add(ttl)
	err := api.App.Cache.Set(key, email, ttl)
	return token, exp, err
}

func removeRefreshToken(token string) error {
	return api.App.Cache.Del(api.App.Cache.FmtKey("refreshToken", token))
}
