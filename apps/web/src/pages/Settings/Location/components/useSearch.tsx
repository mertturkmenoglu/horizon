import { api } from '@/lib/api';
import { SearchLocationResponse } from '@/lib/dto';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useSearch(text: string) {
  return useQuery({
    queryKey: ['location-search', text],
    queryFn: async () => search(text),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled: !!text,
  });
}

const search = async (term: string) => {
  const res = await api<{ data: SearchLocationResponse }>('/location/', {
    params: {
      term,
    },
  });
  return res.data;
};
