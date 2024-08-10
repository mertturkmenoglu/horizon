import { api, isApiError } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

export const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(64),
  confirmPassword: z.string().min(8).max(64),
});

export type ChangePasswordFormInput = z.infer<typeof schema>;

export function useAccountForm() {
  const { t } = useTranslation('settings', { keyPrefix: 'account' });

  const form = useForm<ChangePasswordFormInput>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationKey: ['settings-account'],
    mutationFn: async (values: ChangePasswordFormInput) => {
      await api('/auth/password/change', {
        method: 'PUT',
        body: values,
      });
    },
    onSuccess: () => {
      toast.success(t('password-change-success'));
      form.reset();
    },
    onError: (err) => {
      if (isApiError(err)) {
        toast.error(err.data.message);
      }
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFormInput> = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error(t('password-dont-match'));
      return;
    }

    mutation.mutate(values);
  };

  return {
    mutation,
    onSubmit,
    ...form,
  };
}
