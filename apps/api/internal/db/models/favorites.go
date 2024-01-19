package models

type Favorite struct {
	BaseModel
	ServiceId string `gorm:"not null;uniqueIndex:fav_idx"`
	UserId    string `gorm:"not null;uniqueIndex:fav_idx"`
}
