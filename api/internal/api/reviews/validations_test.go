package reviews

import (
	"errors"
	"horizon/internal/db"
	"testing"
)

func TestValidateReviewVoteTypeShouldReturnCorrectReviewVoteTypeGivenLike(t *testing.T) {
	expected := db.ReviewvotetypeLIKE
	actual, err := validateReviewVoteType("LIKE")

	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if actual != expected {
		t.Errorf("Expected %v, got %v", expected, actual)
	}
}

func TestValidateReviewVoteTypeShouldReturnCorrectReviewVoteTypeGivenDislike(t *testing.T) {
	expected := db.ReviewvotetypeDISLIKE
	actual, err := validateReviewVoteType("DISLIKE")

	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if actual != expected {
		t.Errorf("Expected %v, got %v", expected, actual)
	}
}

func TestValidateReviewVoteTypeShouldReturnErrVoteTypeInvalidGivenInvalidVoteType(t *testing.T) {
	_, err := validateReviewVoteType("INVALID")

	if err == nil {
		t.Errorf("Expected error, got nil")
	}

	if !errors.Is(err, errVoteTypeInvalid) {
		t.Errorf("Expected %v, got %v", errVoteTypeInvalid, err)
	}
}
