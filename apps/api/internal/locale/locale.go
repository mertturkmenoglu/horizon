package locale

import (
	"os"
	"path"

	"github.com/BurntSushi/toml"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
)

var bundle *i18n.Bundle

func New() {
	bundle = i18n.NewBundle(language.English)
	bundle.RegisterUnmarshalFunc("toml", toml.Unmarshal)
	pwd, err := os.Getwd()
	if err != nil {
		panic(err.Error())
	}
	currDir := path.Join(pwd, "internal", "locale")
	bundle.MustLoadMessageFile(path.Join(currDir, "active.en.toml"))
	bundle.MustLoadMessageFile(path.Join(currDir, "active.tr.toml"))
}

func Localizer(langs ...string) *i18n.Localizer {
	if bundle == nil {
		panic("i18n bundle not initialized")
	}

	return i18n.NewLocalizer(bundle, langs...)
}
