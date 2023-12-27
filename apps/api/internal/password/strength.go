package password

import (
	"os"

	"github.com/nbutton23/zxcvbn-go"
)

// According to Dropbox documentation, score of 3 is safely unguessable
// We choose this score as minimum
const MIN_PASSWORD_SECURITY_SCORE = 3
const DEV_MIN_PASSWORD_SECURITY_SCORE = 2

func GetStrength(s string) int {
	entropyMatch := zxcvbn.PasswordStrength(s, []string{})
	return entropyMatch.Score
}

func IsStrong(s string) bool {
	strength := GetStrength(s)
	cmp := MIN_PASSWORD_SECURITY_SCORE
	env := os.Getenv("ENV")

	if env == "dev" {
		cmp = DEV_MIN_PASSWORD_SECURITY_SCORE
	}

	return strength >= cmp
}
