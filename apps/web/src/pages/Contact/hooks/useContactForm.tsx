import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(1).max(100),
  email: z.string().email().min(1).max(100),
  phoneNumber: z.string().min(1).max(32),
  subject: z.string().min(1).max(100),
  message: z.string().min(1).max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function useContactForm() {
  return useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });
}
