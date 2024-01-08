package auth

import (
	"horizon/internal/db"
	"horizon/internal/db/models"
	"horizon/internal/geo"
	"time"

	"github.com/google/uuid"
)

func recordLogin(success bool, ip string, useragent string, authId uuid.UUID) {
	location, _ := geo.GetFormattedLocationFromIp(ip)

	db.Client.Create(&models.AuthActivity{
		AuthId:       authId,
		CreatedAt:    time.Now(),
		ActivityType: 0,
		IpAddress:    ip,
		Success:      success,
		Location:     location,
		UserAgent:    useragent,
	})
}

func recordLogout(authId string) {
	id := uuid.MustParse(authId)
	db.Client.Create(&models.AuthActivity{
		AuthId:       id,
		CreatedAt:    time.Now(),
		ActivityType: 1,
		IpAddress:    "",
		Success:      true,
		Location:     "",
		UserAgent:    "",
	})
}

func recordPasswordChange(success bool, ip string, useragent string, authId uuid.UUID) {
	location, _ := geo.GetFormattedLocationFromIp(ip)

	db.Client.Create(&models.AuthActivity{
		AuthId:       authId,
		CreatedAt:    time.Now(),
		ActivityType: 2,
		IpAddress:    ip,
		Success:      success,
		Location:     location,
		UserAgent:    useragent,
	})
}

func recordPasswordReset(success bool, ip string, useragent string, authId uuid.UUID) {
	location, _ := geo.GetFormattedLocationFromIp(ip)

	db.Client.Create(&models.AuthActivity{
		AuthId:       authId,
		CreatedAt:    time.Now(),
		ActivityType: 3,
		IpAddress:    ip,
		Success:      success,
		Location:     location,
		UserAgent:    useragent,
	})
}

func recordEmailVerification(success bool, ip string, useragent string, authId uuid.UUID) {
	location, _ := geo.GetFormattedLocationFromIp(ip)

	db.Client.Create(&models.AuthActivity{
		AuthId:       authId,
		CreatedAt:    time.Now(),
		ActivityType: 4,
		IpAddress:    ip,
		Success:      success,
		Location:     location,
		UserAgent:    useragent,
	})
}
