'use client';

import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
  listId: string;
};

export default function DeleteButton({ listId }: Props) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete-list'],
    mutationFn: async (id: string) => {
      await api.delete(`lists/${id}`);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ['lists'],
      });

      toast.success('List deleted successfully. Redirecting...');
      setTimeout(() => {
        window.location.href = '/lists';
      }, 2000);
    },
    onError: () => {
      toast.error('Failed to delete list');
    },
  });
  return (
    <Button
      type="submit"
      variant="destructive"
      onClick={() => mutation.mutate(listId)}
    >
      Delete
    </Button>
  );
}
