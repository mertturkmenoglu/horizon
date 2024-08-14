package auth

import (
	"context"
	"errors"
	"fmt"
	"horizon/internal/db"
	"horizon/internal/h"
	"strings"

	"github.com/jackc/pgx/v5"
)

func generateUsernameFromEmail(db *db.Db, email string) (string, error) {
	localPart := strings.Split(email, "@")[0]
	validLocalPart := cleanEmailLocalPart(localPart)

	// Check if a user with validLocalPart username exists
	_, err := db.Queries.GetUserByUsername(context.Background(), validLocalPart)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			// No user, we can use this username
			return validLocalPart, nil
		} else {
			// Something else happened. Abort.
			return "", err
		}
	} else {
		// There's already a user with this username.
		// Append random string at the end of validLocalPart.
		// What happens if there is a user with that username though?
		// Well, Jesus take the wheel, this app works on prayers.
		var base = validLocalPart

		if len(validLocalPart) > 24 {
			base = validLocalPart[0:24]
		}

		return base + h.RandStringRunes(8), nil
	}
}

func cleanEmailLocalPart(localPart string) string {
	var validLocalPart = ""

	for _, r := range localPart {
		if isAllowedRune(r) {
			validLocalPart = fmt.Sprintf("%s%c", validLocalPart, r)
		}
	}

	return validLocalPart
}
