import { api } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export function useProfileImageMutation() {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['settings-profile-image'],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      await api('/users/profile/image', {
        method: 'PUT',
        body: formData,
      });
    },
    onSuccess: () => {
      toast.success(t('update-ok'));
      qc.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: () => {
      toast.error(t('update-err'));
    },
  });
}
