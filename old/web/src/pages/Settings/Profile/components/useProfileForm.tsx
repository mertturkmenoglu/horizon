import { api } from '@/lib/api';
import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(48),
  description: z.string().max(256).optional(),
  gender: z.string().max(32).optional(),
});

export type ProfileFormInput = z.infer<typeof schema>;

export function useProfileForm(user: GetMeResponse) {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });
  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      gender: user.gender,
    },
  });
  const mutation = useMutation({
    mutationKey: ['settings', 'profile'],
    mutationFn: async (values: ProfileFormInput) => {
      await api('/users/profile', {
        method: 'PATCH',
        body: values,
      });
    },
    onSuccess: () => {
      toast.success(t('update-ok'));
    },
    onError: () => {
      toast.error(t('update-err'));
    },
  });
  return { form, mutation };
}
