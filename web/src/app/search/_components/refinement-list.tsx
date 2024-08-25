'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { getCategoryTitle } from '@/lib/categories';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { useRefinementList } from 'react-instantsearch';

type Props = {
  attribute:
    | 'category'
    | 'price'
    | 'priceUnit'
    | 'priceTimespan'
    | 'isOnline'
    | 'deliveryTime'
    | 'deliveryTimespan';
  className?: string;
};

export default function RefinementList({ attribute, className }: Props) {
  const {
    canToggleShowMore,
    items,
    isShowingMore,
    refine,
    searchForItems,
    toggleShowMore,
  } = useRefinementList({
    attribute: attribute,
    limit: attribute === 'category' ? 10 : 5,
    operator: 'and',
    showMore: true,
    showMoreLimit: attribute === 'category' ? 20 : 10,
    sortBy: ['isRefined', 'name:asc', 'count:desc'],
  });

  const title = useMemo(() => {
    switch (attribute) {
      case 'category':
        return 'Categories';
      case 'price':
        return 'Price';
      case 'priceUnit':
        return 'Price Unit';
      case 'priceTimespan':
        return 'Price Timespan';
      case 'isOnline':
        return 'Is Online';
      case 'deliveryTime':
        return 'Delivery Time';
      case 'deliveryTimespan':
        return 'Delivery Timespan';
      default:
        return attribute;
    }
  }, [attribute]);

  const searchPlaceholder = useMemo(() => {
    switch (attribute) {
      case 'category':
        return 'Search a category';
      default:
        return attribute;
    }
  }, [attribute]);

  const showInput = useMemo(() => {
    const searchable = ['category'];
    return searchable.includes(attribute);
  }, [attribute]);

  const shouldRenderButton = useMemo(() => {
    const dontRenderButton = ['priceTimespan', 'deliveryTimespan', 'isOnline'];
    return !dontRenderButton.includes(attribute);
  }, [attribute]);

  const getLabel = (label: string) => {
    if (attribute === 'category') {
      return getCategoryTitle(+label);
    }
    return label;
  };

  return (
    <div className={cn('my-2', className)}>
      <div className="font-semibold tracking-tight">{title}</div>
      {showInput && (
        <Input
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={512}
          className="my-4"
          onChange={(event) => searchForItems(event.currentTarget.value)}
          placeholder={searchPlaceholder}
        />
      )}
      <ul
        className={cn('space-y-2', {
          'mt-2': !showInput,
        })}
      >
        {items.map((item) => (
          <li key={item.label}>
            <label className="flex items-center">
              <Checkbox
                checked={item.isRefined}
                onCheckedChange={() => refine(item.value)}
              />
              <span className="ml-2 text-sm capitalize">
                {getLabel(item.label)}
              </span>
              <span className="ml-px text-sm text-muted-foreground">
                {' '}
                ({item.count})
              </span>
            </label>
          </li>
        ))}
      </ul>
      {shouldRenderButton && (
        <Button
          variant="link"
          onClick={toggleShowMore}
          disabled={!canToggleShowMore}
          className="px-0"
        >
          {isShowingMore ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
}
