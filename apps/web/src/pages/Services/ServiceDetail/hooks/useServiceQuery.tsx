import { api } from '@/lib/api';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useQuery } from '@tanstack/react-query';

export function useServiceQuery(id: string | undefined) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await api<{ data: GetServiceByIdResponse }>(
        '/services/' + id
      );
      return res.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
