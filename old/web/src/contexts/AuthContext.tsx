import { GetMeResponse } from '@/lib/dto';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import React from 'react';

export type TAuthContextState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: GetMeResponse | null;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<GetMeResponse, Error>>;
};

export const defaultValues: TAuthContextState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  refetch: undefined,
};

export const AuthContext = React.createContext(defaultValues);
