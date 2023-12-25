package password

import "github.com/nbutton23/zxcvbn-go"

// According to Dropbox documentation, score of 4 is very unguessable
// We choose this score as minimum
const MIN_PASSWORD_SECURITY_SCORE = 4

func GetStrength(s string) int {
	entropyMatch := zxcvbn.PasswordStrength(s, []string{})
	return entropyMatch.Score
}

func IsStrong(s string) bool {
	strength := GetStrength(s)
	return strength >= MIN_PASSWORD_SECURITY_SCORE
}
