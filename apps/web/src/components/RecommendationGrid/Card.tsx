import { cn } from '@/lib/cn';
import { TRecommendation } from './index';
import Rating from './Rating';
import Chip from './Chip';

type CardProps = TProps & {
  item: TRecommendation;
};

function Chips({ item }: CardProps): React.ReactElement {
  return (
    <div className="flex gap-2 flex-wrap justify-end">
      <Chip
        type="price"
        text={`From ${item.price}`}
      />

      {item.isPro && (
        <Chip
          type="pro"
          text="Pro"
        />
      )}

      {item.isNew && (
        <Chip
          text="New"
          type="new"
        />
      )}

      {item.topRated && (
        <Chip
          text="Top Rated"
          type="topRated"
        />
      )}
    </div>
  );
}

function Card({ className, item }: CardProps): React.ReactElement {
  return (
    <a
      href={item.url}
      className={cn('rounded-md block group', className)}
    >
      <img
        src={item.image}
        alt=""
        className="w-full aspect-video object-cover rounded-t-md"
      />
      <div className="pt-2 rounded-b-md">
        <div className="flex items-start justify-between h-16">
          <div className="w-full">
            <div className="text-base uppercase font-semibold text-midnight group-hover:underline line-clamp-2">
              {item.title}
            </div>
            <div className="text-neutral-500 text-sm">@{item.username}</div>
          </div>

          <Chips item={item} />
        </div>

        <Rating
          rating={item.rating}
          className="mt-2"
        />
      </div>
    </a>
  );
}

export default Card;
