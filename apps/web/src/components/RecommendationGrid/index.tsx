import { cn } from '@/lib/cn';
import React from 'react';
import Chip from './Chip';
import Rating from './Rating';

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
          {items.map((item, i) => (
            <a
              href="/"
              key={item.image + i}
              className="rounded-md block group"
            >
              <img
                src={item.image}
                alt=""
                className="w-full aspect-video object-cover rounded-t-md"
              />
              <div className="pt-2 rounded-b-md pb-4">
                <div className="text-base uppercase font-semibold text-midnight group-hover:underline">
                  {item.title}
                </div>
                <div className="text-neutral-500 text-sm">@{item.username}</div>

                <div className="flex gap-x-2 flex-wrap mt-2">
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

                <Rating
                  rating={item.rating}
                  className="mt-2"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
);

RecommendationGrid.displayName = 'RecommendationGrid';

export default RecommendationGrid;
