package auth

import (
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/geo"
	"time"

	"github.com/google/uuid"
)

func recordLoginAttempt(success bool, ip string, useragent string, authId uuid.UUID) {
	location, _ := geo.GetFormattedLocationFromIp(ip)

	db.Client.Create(&models.AuthActivity{
		AuthId:    authId,
		CreatedAt: time.Now(),
		IpAddress: ip,
		Success:   success,
		Location:  location,
		UserAgent: useragent,
	})
}
