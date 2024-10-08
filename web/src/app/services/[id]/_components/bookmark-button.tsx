'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { AuthContext } from '@/providers/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  isBookmarked: boolean;
  hserviceId: string;
};

export default function BookmarkButton({ isBookmarked, hserviceId }: Props) {
  const [booked, setBooked] = useState(isBookmarked);
  const qc = useQueryClient();
  const { isLoading, user } = useContext(AuthContext);
  const isSignedIn = !isLoading && user !== null;

  const mutation = useMutation({
    mutationKey: ['bookmark', hserviceId],
    mutationFn: async () => {
      if (booked) {
        await api.delete(`bookmarks/${hserviceId}`);
      } else {
        await api.post('bookmarks/', {
          json: {
            hserviceId,
          },
        });
      }
    },
    onSuccess: async () => {
      const prev = booked;
      setBooked((prev) => !prev);
      await qc.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success(prev ? 'Bookmark removed' : 'Bookmark added');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => {
              if (!isSignedIn) {
                toast.warning('You need to be signed in.');
                return;
              }

              mutation.mutate();
            }}
          >
            <BookmarkIcon
              className={cn('size-6 text-primary', {
                'fill-primary': booked,
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{booked ? 'Remove bookmark' : 'Add to bookmarks'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
