package dto

type CreateFavoriteRequest struct {
	ServiceId string `json:"serviceId"`
}

type FavoriteDto struct {
	Id        string `json:"id"`
	ServiceId string `json:"serviceId"`
	UserId    string `json:"userId"`
}
