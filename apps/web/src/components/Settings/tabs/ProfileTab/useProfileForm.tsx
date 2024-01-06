import { GetMeResponse } from '@/lib/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1).max(48),
  gender: z.string().max(32).optional(),
  email: z.string().email().or(z.string().max(0)),
  phone: z.string().max(15).optional(),
  address: z.string().max(64).optional(),
  other: z.string().max(64).optional(),
});

export type ProfileFormInput = z.infer<typeof schema>;

export function useProfileForm(user: GetMeResponse) {
  return useForm<ProfileFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      address: user.contactInformation.address,
      email: user.contactInformation.email,
      gender: user.gender,
      other: user.contactInformation.other,
      phone: user.contactInformation.phone,
    },
  });
}
