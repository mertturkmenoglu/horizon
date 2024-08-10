import { api } from '@/lib/api';
import { TPaginatedResponse } from '@/lib/dto';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useQuery } from '@tanstack/react-query';

export function useUserServicesQuery(username: string) {
  return useQuery({
    queryKey: ['user-services', username],
    queryFn: async () => {
      const res = await api<TPaginatedResponse<GetServiceByIdResponse[]>>(
        `/services/user/${username}`
      );
      return res;
    },
    refetchOnWindowFocus: false,
  });
}
