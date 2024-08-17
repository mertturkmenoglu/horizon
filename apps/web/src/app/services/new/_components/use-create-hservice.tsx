'use client';

import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useCreateHService() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['new-hservice'],
    mutationFn: async (payload: any) => {
      await api.post('hservices/', {
        json: payload,
      });
    },
    onSuccess: async () => {
      toast.success('Service created successfully. Redirecting...');
      await qc.invalidateQueries({ queryKey: ['my-hservices'] });
      setTimeout(() => {
        router.push('/services');
      }, 2000);
    },
    onError: () => {
      toast.error('Failed to create service');
    },
  });
}
