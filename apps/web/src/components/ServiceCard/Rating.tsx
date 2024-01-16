import { cn } from '@/lib/cn';
import { StarIcon } from '@heroicons/react/24/solid';

type RatingProps = TProps & {
  totalPoints: number;
  totalVotes: number;
};

function Rating({
  className,
  totalPoints,
  totalVotes,
}: RatingProps): React.ReactElement {
  const score = totalVotes === 0 ? 0 : (totalPoints / totalVotes).toFixed(1);
  return (
    <div className={cn('flex items-center lining-nums', className)}>
      <StarIcon className="size-5 text-sky-500" />
      <div className="ml-2 font-semibold lining-nums">{score}</div>
      <div className="ml-1 text-sm text-neutral-500">({totalVotes})</div>
    </div>
  );
}

export default Rating;
