import { PageContext } from './PageContext';
import { useEffect } from 'react';
import { useFavStore } from '@/stores/useFavStore';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { TResponse } from '@/lib/dto';
import { MyFavoritesResponse } from '@/lib/dto/favorites';

interface PageContextProviderProps {
  children: React.ReactNode;
}

export function PageContextProvider({ children }: PageContextProviderProps) {
  const set = useFavStore((s) => s.setFavs);
  const query = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await api<TResponse<MyFavoritesResponse>>('/favorites/');
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      set(query.data);
    }
  }, [query.data]);

  return <PageContext.Provider value={{}}>{children}</PageContext.Provider>;
}
