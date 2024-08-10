import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getPhoneWithoutCallingCode } from './utils';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const schema = z.object({
  email: z.string().email().or(z.string().max(0)),
  phone: z.string().length(10).or(z.string().max(0)),
  address: z.string().max(128).optional(),
  other: z.string().max(256).optional(),
  links: z.array(
    z.object({
      name: z.string().max(64),
      value: z.string().url().max(64).optional(),
    })
  ),
});

export type ContactInformationFormInput = z.infer<typeof schema>;

export function useContactForm(user: GetMeResponse) {
  const { t } = useTranslation('settings', { keyPrefix: 'profile' });

  const form = useForm<ContactInformationFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: user.contactInformation.address,
      email: user.contactInformation.email,
      other: user.contactInformation.other,
      phone: getPhoneWithoutCallingCode(user.contactInformation.phone),
      links: user.contactInformation.links,
    },
  });

  const mutation = useMutation({
    mutationKey: ['settings', 'contact'],
    mutationFn: async (
      values: ContactInformationFormInput & { callCode: string }
    ) => {
      const { callCode, ...rest } = values;
      await api('/users/profile/contact', {
        method: 'PATCH',
        body: {
          ...rest,
          phone: '+' + callCode + values.phone,
        },
      });
    },
    onSuccess: () => {
      toast.success(t('update-ok'));
    },
    onError: () => {
      toast.error(t('update-err'));
    },
  });

  return {
    mutation,
    form,
  };
}
