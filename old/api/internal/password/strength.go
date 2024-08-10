package password

import (
	"github.com/nbutton23/zxcvbn-go"
	"github.com/spf13/viper"
)

// Returns the zxcvbn entropy score value of the given string s.
func GetStrength(s string) int {
	entropyMatch := zxcvbn.PasswordStrength(s, []string{})
	return entropyMatch.Score
}

// Checks if the zxcvbn entropy score value of the given string s
// is greater or equal to minimum security score.
func IsStrong(s string) bool {
	strength := GetStrength(s)
	cmp := viper.GetInt("api.auth.password.min-security")

	return strength >= cmp
}
