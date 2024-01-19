import { PageContext } from './PageContext';
import { useEffect } from 'react';
import { useFavStore } from '@/stores/useFavStore';

interface PageContextProviderProps {
  children: React.ReactNode;
}

export function PageContextProvider({ children }: PageContextProviderProps) {
  const fetchFavs = useFavStore((s) => s.fetch);

  useEffect(() => {
    fetchFavs();
  }, []);

  return <PageContext.Provider value={{}}>{children}</PageContext.Provider>;
}
