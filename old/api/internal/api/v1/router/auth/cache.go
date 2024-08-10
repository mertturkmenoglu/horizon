package auth

import "horizon/internal/api"

func getVerifyEmailCodeFromCache(email string) (string, error) {
	key := api.App.Cache.FmtKey("verifyEmail", email)
	return api.App.Cache.Get(key)
}

func getResetPasswordCodeFromCache(email string) (string, error) {
	key := api.App.Cache.FmtKey("passwordReset", email)
	return api.App.Cache.Get(key)
}

func cacheHasPasswordResetCode(email string) bool {
	return api.App.Cache.Has(api.App.Cache.FmtKey("passwordReset", email))
}

func cacheHasVerifyEmailCode(email string) bool {
	return api.App.Cache.Has(api.App.Cache.FmtKey("verifyEmail", email))
}
