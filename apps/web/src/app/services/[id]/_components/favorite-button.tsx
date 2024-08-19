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
import { Heart } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  isFavorite: boolean;
  hserviceId: string;
};

export default function FavoriteButton({ isFavorite, hserviceId }: Props) {
  const [fav, setFav] = useState(isFavorite);
  const qc = useQueryClient();
  const { isLoading, user } = useContext(AuthContext);
  const isSignedIn = !isLoading && user !== null;

  const mutation = useMutation({
    mutationKey: ['favorites', hserviceId],
    mutationFn: async () => {
      if (fav) {
        await api.delete(`favorites/${hserviceId}`);
      } else {
        await api.post(`favorites/`, {
          json: {
            hserviceId,
          },
        });
      }
    },
    onSuccess: async () => {
      const prev = fav;
      setFav((prev) => !prev);
      await qc.invalidateQueries({ queryKey: ['favorites'] });
      toast.success(prev ? 'Removed from favorites' : 'Added to favorites');
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
            <Heart
              className={cn('size-6 text-primary', {
                'fill-primary': fav,
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{fav ? 'Remove favorite' : 'Add to favorites'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
