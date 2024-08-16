'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useCreateHService() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['new-hservice'],
    mutationFn: async (payload: any) => {
      console.log({ payload });
    },
    onSuccess: () => {
      toast.success('Service created successfully. Redirecting...');
      setTimeout(() => {
        router.push('/services');
      }, 2000);
    },
    onError: (e) => {
      toast.error('Failed to create service');
    },
  });
}
