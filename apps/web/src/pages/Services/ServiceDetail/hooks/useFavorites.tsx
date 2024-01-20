import { api } from '@/lib/api';
import { GetServiceByIdResponse } from '@/lib/dto/service';
import { useFavStore } from '@/stores/useFavStore';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';

export function useFavorites(service: GetServiceByIdResponse) {
  const refetchFavs = useFavStore((s) => s.fetch);
  const favs = useFavStore((s) => s.favs);

  const fav = useMemo(() => {
    const f = favs.find((f) => f.serviceId === service.id);
    return f;
  }, [favs, service.id]);

  const isFavorite = !!fav;

  const mutation = useMutation({
    mutationKey: ['service', 'favorite', service.id],
    mutationFn: async () => {
      if (isFavorite) {
        // Delete
        await api(`/favorites/${fav.id}`, {
          method: 'DELETE',
        });
      } else {
        // Create
        await api('/favorites/', {
          method: 'POST',
          body: {
            serviceId: service.id,
          },
        });
      }
    },
    onSuccess: () => {
      toast.success('Success');
    },
    onError: () => {
      toast.error('Failed');
    },
    onSettled: async () => {
      await refetchFavs();
    },
  });

  return { isFavorite, mutation };
}
