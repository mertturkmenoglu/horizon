import { api } from '@/lib/api';
import { GetUserByUsernameResponse, TResponse } from '@/lib/dto';
import { useQuery } from '@tanstack/react-query';

export function useUserQuery(username?: string | undefined) {
  return useQuery({
    queryKey: ['user', username],
    enabled: username !== undefined,
    queryFn: async () => {
      const res = await api<TResponse<GetUserByUsernameResponse>>(
        `/users/${username}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}
