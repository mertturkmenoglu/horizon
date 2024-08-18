'use client';

import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
  hserviceId: string;
  listId: string | null;
};

export default function AddToListButton({ hserviceId, listId }: Props) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['add-to-list'],
    mutationFn: async ({}: any) => {
      // TODO: Implement later
    },
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ['my-lists-info'],
      });
      toast.success('Added to the list');
    },
    onError: (e) => {
      toast.error(`Cannot add to the list: ${e.message}`);
    },
  });

  return (
    <Button
      type="button"
      variant="default"
      onClick={() => mutation.mutate({ hserviceId, listId })}
      disabled={listId === null}
    >
      Add to list
    </Button>
  );
}
