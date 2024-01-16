import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getPhoneWithoutCallingCode } from './utils';

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
  return useForm<ContactInformationFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: user.contactInformation.address,
      email: user.contactInformation.email,
      other: user.contactInformation.other,
      phone: getPhoneWithoutCallingCode(user.contactInformation.phone),
      links: user.contactInformation.links,
    },
  });
}
