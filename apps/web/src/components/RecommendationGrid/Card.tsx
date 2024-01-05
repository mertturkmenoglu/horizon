import { cn } from '@/lib/cn';
import { TRecommendation } from './index';
import Rating from './Rating';
import Chip from './Chip';

type CardProps = TProps & {
  item: TRecommendation;
};

function Chips({ item, className }: CardProps): React.ReactElement {
  return (
    <div className={cn('flex gap-2 flex-wrap justify-end', className)}>
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
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-start">
            <div>
              <div className="text-sm font-semibold text-midnight group-hover:underline line-clamp-1">
                {item.title}
              </div>
              <div className="text-neutral-500 text-sm">@{item.username}</div>
            </div>

            <img
              src={item.userImage}
              alt=""
              className="size-8 min-h-8 min-w-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 h-12 space-x-4">
          <Rating
            rating={item.rating}
            className=""
          />

          <Chips
            item={item}
            className=""
          />
        </div>
      </div>
    </a>
  );
}

export default Card;
