package locale

import (
	"os"
	"path"

	"github.com/BurntSushi/toml"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
)

type Locale struct {
	Bundle *i18n.Bundle
}

func New() *Locale {
	l := Locale{}
	l.Bundle = i18n.NewBundle(language.English)
	l.Bundle.RegisterUnmarshalFunc("toml", toml.Unmarshal)
	pwd, err := os.Getwd()

	if err != nil {
		panic(err.Error())
	}

	currDir := path.Join(pwd, "internal", "locale")
	l.Bundle.MustLoadMessageFile(path.Join(currDir, "active.en.toml"))
	l.Bundle.MustLoadMessageFile(path.Join(currDir, "active.tr.toml"))

	return &l
}

func (l *Locale) Localizer(langs ...string) *i18n.Localizer {
	if l.Bundle == nil {
		panic("i18n bundle not initialized")
	}

	return i18n.NewLocalizer(l.Bundle, langs...)
}
