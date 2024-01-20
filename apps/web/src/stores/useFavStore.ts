import { api } from '@/lib/api';
import { TResponse } from '@/lib/dto';
import { FavoriteDto, MyFavoritesResponse } from '@/lib/dto/favorites';
import { create } from 'zustand';

type FavState = {
  favs: FavoriteDto[];
  setFavs: (favs: FavoriteDto[]) => void;
  fetch: () => Promise<void>;
};

export const useFavStore = create<FavState>()((set) => ({
  favs: [],
  setFavs: (favs: FavoriteDto[]) => {
    set({ favs });
  },
  fetch: async () => {
    try {
      const res = await api<TResponse<MyFavoritesResponse>>('/favorites/');
      set({ favs: res.data });
    } catch (err) {
      set({ favs: [] });
    }
  },
}));
