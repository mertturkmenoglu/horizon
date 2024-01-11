import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const priceUnits = ['USD', 'TRY'] as const;

export const timespans = ['Hour', 'Day', 'Week', 'Month'] as const;

export const schema = z.object({
  title: z.string().min(1).max(64),
  description: z.string().min(1).max(4096),
  category: z.number().min(1).max(45),
  price: z.string().min(1).max(10),
  priceUnit: z.enum(priceUnits),
  priceTimespan: z.number().min(0).max(3),
  isOnline: z.boolean(),
  location: z.string().min(1).max(128),
  deliveryTime: z.number().min(0).max(50),
  deliveryTimespan: z.number().min(0).max(3),
});

export type NewServiceFormInput = z.infer<typeof schema>;

export function useNewServiceForm() {
  return useForm<NewServiceFormInput>({
    resolver: zodResolver(schema),
  });
}
