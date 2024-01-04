import { GetMeResponse } from '@/lib/dto';
import React from 'react';

export type TAuthContextState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: GetMeResponse | null;
};

export const defaultValues: TAuthContextState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

export const AuthContext = React.createContext(defaultValues);
