import { cn } from '@/lib/cn';
import React from 'react';
import Card from './Card';
import { useTranslation } from 'react-i18next';

export type TRecommendation = {
  url: string;
  image: string;
  title: string;
  username: string;
  userImage: string;
  price: string;
  rating: {
    score: number;
    reviews: number;
  };
  topRated: boolean;
  isPro: boolean;
  isNew: boolean;
};

type El = React.ElementRef<'div'>;
type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> & {
  title: {
    text: string;
    href: string;
  };
  items: TRecommendation[];
};

const RecommendationGrid = React.forwardRef<El, Props>(
  ({ className, title, items, ...props }, ref) => {
    const { t } = useTranslation('common', {
      keyPrefix: 'recommendation-grid',
    });

    return (
      <div
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        <div className="flex items-baseline space-x-4">
          <div className="text-2xl text-midnight">{title.text}</div>
          <a
            href={title.href}
            className=" flex items-center space-x-2 font-bold text-midnight underline"
          >
            <div>{t('more')}</div>
          </a>
        </div>

        <div className="mt-4 grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {items.map((item) => (
            <Card
              item={item}
              key={item.title}
            />
          ))}
        </div>
      </div>
    );
  }
);

RecommendationGrid.displayName = 'RecommendationGrid';

export default RecommendationGrid;
