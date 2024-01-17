import { api } from '@/lib/api';
import { GeoLocation } from '@/lib/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export function useLocation(entry: GeoLocation, onSettled: () => void) {
  const { t } = useTranslation('settings', { keyPrefix: 'location' });
  const { name, admin, country, lat, long } = entry;
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['settings-location'],
    mutationFn: async () => {
      await api('/users/profile/location', {
        method: 'PATCH',
        body: {
          city: name,
          admin: admin.name,
          country: country,
          lat,
          long,
        },
      });
    },
    onSuccess: () => {
      toast.success(t('update-ok'));
      qc.invalidateQueries({
        queryKey: ['auth'],
      });
    },
    onError: () => {
      toast.error(t('update-err'));
    },
    onSettled: onSettled,
  });
}
