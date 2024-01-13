import { cn } from '@/lib/cn';
import { TRecommendation } from './index';
import Rating from './Rating';
import Chip from './Chip';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type CardProps = TProps & {
  item: TRecommendation;
};

function Chips({ item, className }: CardProps): React.ReactElement {
  const { t } = useTranslation('common', {
    keyPrefix: 'recommendation-grid',
  });

  return (
    <div className={cn('flex flex-wrap justify-end gap-2', className)}>
      <Chip
        type="price"
        text={t('price', { price: item.price })}
      />

      {item.isPro && (
        <Chip
          type="pro"
          text={t('pro')}
        />
      )}

      {item.isNew && (
        <Chip
          type="new"
          text={t('new')}
        />
      )}

      {item.topRated && (
        <Chip
          type="topRated"
          text={t('top-rated')}
        />
      )}
    </div>
  );
}

function Card({ className, item }: CardProps): React.ReactElement {
  return (
    <Link
      to={item.url}
      className={cn('group block rounded-md', className)}
    >
      <img
        src={item.image}
        alt=""
        className="aspect-video w-full rounded-t-md object-cover"
      />
      <div className="rounded-b-md pt-2">
        <div className="flex flex-col">
          <div className="flex w-full items-start justify-between">
            <div>
              <div className="line-clamp-1 text-sm font-semibold text-midnight group-hover:underline">
                {item.title}
              </div>
              <div className="text-sm text-neutral-500">@{item.username}</div>
            </div>

            <img
              src={item.userImage}
              alt=""
              className="size-8 min-h-8 min-w-8 rounded-full"
            />
          </div>
        </div>

        <div className="mt-2 flex h-12 items-center justify-between space-x-4">
          <Rating rating={item.rating} />
          <Chips item={item} />
        </div>
      </div>
    </Link>
  );
}

export default Card;
