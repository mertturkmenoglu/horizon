import { cn } from '@/lib/cn';
import React from 'react';
import Card from './Card';

export type TRecommendation = {
  url: string;
  image: string;
  title: string;
  username: string;
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
    return (
      <div
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        <div className="flex space-x-4 items-baseline">
          <div className="text-midnight text-2xl">{title.text}</div>
          <a
            href={title.href}
            className=" font-bold underline text-midnight flex items-center space-x-2"
          >
            <div>See all</div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 mt-4 items-center gap-4">
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
