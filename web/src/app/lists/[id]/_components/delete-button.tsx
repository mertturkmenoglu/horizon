'use client';

import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';

type Props = {
  listId: string;
};

const redirectTimeout = 3000;

export default function DeleteButton({ listId }: Readonly<Props>) {
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
      }, redirectTimeout);
    },
    onError: () => {
      toast.error('Failed to delete list');
    },
  });

  const onDeleteClick = useCallback(() => {
    mutation.mutate(listId);
  }, [listId, mutation]);

  return (
    <Button
      type="submit"
      variant="destructive"
      onClick={onDeleteClick}
    >
      Delete
    </Button>
  );
}
