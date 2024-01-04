import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { GetMeResponse } from '@/lib/dto';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const query = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const res = await api<{ data: GetMeResponse }>('/users/me');
      return res.data;
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !query.isLoading && !!query.data,
        isLoading: query.isLoading,
        user: query.data ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
