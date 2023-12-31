package password

import (
	"github.com/nbutton23/zxcvbn-go"
	"github.com/spf13/viper"
)

func GetStrength(s string) int {
	entropyMatch := zxcvbn.PasswordStrength(s, []string{})
	return entropyMatch.Score
}

func IsStrong(s string) bool {
	strength := GetStrength(s)
	cmp := viper.GetInt("api.auth.password.min-security")

	return strength >= cmp
}
