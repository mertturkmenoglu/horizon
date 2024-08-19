'use client';

import api from '@/lib/api';
import { Auth } from '@/lib/auth';
import { useQuery } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

type AuthContextState = {
  isLoading: boolean;
  user: Auth | null;
};

export const AuthContext = React.createContext<AuthContextState>({
  isLoading: true,
  user: null,
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const query = useQuery({
    queryKey: ['auth-me'],
    queryFn: async () => {
      const res = await api.get('auth/me');
      return res.json<Auth>();
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isLoading: query.isLoading,
        user: query.data || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
