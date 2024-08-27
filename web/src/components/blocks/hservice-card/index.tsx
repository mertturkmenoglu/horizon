import { getCategoryTitle } from '@/lib/categories';
import { HServiceResponseDto } from '@/lib/dto';
import { cn } from '@/lib/utils';
import FormattedRating from '../formatted-rating';

type Props = {
  hservice: HServiceResponseDto;
} & React.HTMLAttributes<HTMLDivElement>;

export default function HServiceCard({ hservice, className, ...props }: Props) {
  const image = hservice.media.data[0];

  const rating = (() => {
    if (hservice.totalVotes === 0) {
      return 0;
    }

    return hservice.totalPoints / hservice.totalVotes;
  })();

  return (
    <div
      key={hservice.id}
      className={cn('group', className)}
      {...props}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="aspect-square size-[256px] w-full rounded-xl object-cover"
      />

      <div className="my-2">
        <FormattedRating
          rating={rating}
          votes={hservice.totalVotes}
          starsClassName="size-4"
        />
        <div className="mt-2 line-clamp-1 text-lg font-semibold capitalize">
          {hservice.title}
        </div>
      </div>

      <div>
        <div className="flex-1 space-y-2">
          <div className="text-sm text-primary">
            {getCategoryTitle(hservice.category)}
          </div>
        </div>
      </div>
    </div>
  );
}
