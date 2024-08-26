package reviews

import "horizon/internal/db"

func validateReviewVoteType(s string) (db.Reviewvotetype, error) {
	switch s {
	case "LIKE":
		return db.ReviewvotetypeLIKE, nil
	case "DISLIKE":
		return db.ReviewvotetypeDISLIKE, nil
	default:
		return "", errVoteTypeInvalid
	}
}
