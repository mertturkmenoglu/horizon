import { z } from 'zod';

export const schema = z.object({
  targetId: z.string().min(1),
  targetType: z.enum(['hservice', 'user', 'review']),
  reason: z.string().min(1, { message: 'You must select a reason' }),
  comment: z.string().nullable(),
});

export type FormInput = z.infer<typeof schema>;
