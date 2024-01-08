import { StarIcon } from '@heroicons/react/24/solid';
import { TRecommendation } from '.';
import { cn } from '@/lib/cn';

type RatingProps = TProps & {
  rating: TRecommendation['rating'];
};

function Rating({ className, rating }: RatingProps): React.ReactElement {
  return (
    <div className={cn('flex items-center lining-nums', className)}>
      <StarIcon className="size-5 text-sky-500" />
      <div className="ml-2 font-semibold">{rating.score}</div>
      <div className="ml-1 text-sm text-neutral-500">({rating.reviews})</div>
    </div>
  );
}

export default Rating;
