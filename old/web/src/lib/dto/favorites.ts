export type MyFavoritesResponse = FavoriteDto[];

export type CreateFavoriteRequest = {
  serviceId: string;
};

export type FavoriteDto = {
  id: string;
  serviceId: string;
  userId: string;
};
