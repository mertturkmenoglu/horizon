package auth

func isAllowedRune(r rune) bool {
	if '0' <= r && r <= '9' {
		return true
	}

	if 'A' <= r && r <= 'Z' {
		return true
	}

	if r == '_' {
		return true
	}

	if 'a' <= r && r <= 'z' {
		return true
	}

	return false
}

func isValidUsername(str string) bool {
	for _, r := range str {
		if !isAllowedRune(r) {
			return false
		}
	}

	return true
}
