'use client';

import { Rating } from '@/components/ui/rating';
import { useCallback, useId } from 'react';

type Props = {
  rating: number;
  votes: number;
  starsClassName?: string;
};

export default function FormattedRating({
  rating,
  votes,
  starsClassName,
}: Readonly<Props>) {
  const id = useId();
  const fmt = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    compactDisplay: 'short',
    notation: 'compact',
  });

  const formattedRating = fmt.format(votes);
  const onChange = useCallback(() => {}, []);

  return (
    <div className="flex items-center space-x-2">
      <Rating
        id={id}
        onChange={onChange}
        defaultValue={rating}
        disabled={true}
        starsClassName={starsClassName}
      />
      <div className="flex items-center space-x-1">
        <span className="font-bold">{rating.toFixed(1)}</span>
        <span>({formattedRating})</span>
      </div>
    </div>
  );
}
