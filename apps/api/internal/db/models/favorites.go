package models

type Favorite struct {
	BaseModel
	ServiceId string  `gorm:"not null;uniqueIndex:fav_idx"`
	Service   Service ``
	UserId    string  `gorm:"not null;uniqueIndex:fav_idx;index:fav_user_idx"`
}
