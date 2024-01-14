import { cn } from '@/lib/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NavItem from './NavItem';
import NavButton from './NavButton';
import { useCategoryNavigation } from './useCategoryNavigation';
import { useCategoryData } from '@/hooks/useCategoryData';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export type CategoryNavigationProps = React.ComponentPropsWithoutRef<'nav'>;

const TIMEOUT_DURATION = 250;
let timeout: NodeJS.Timeout | null = null;
let categoryChangeTimeout: NodeJS.Timeout | null = null;

function CategoryNavigation({
  className,
  ...props
}: CategoryNavigationProps): React.ReactElement {
  const { t } = useTranslation('appbar');
  const scrollAmount = 256;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const categoryData = useCategoryData();

  const category = useMemo(() => {
    return categoryData.data.at(index);
  }, [index, categoryData]);

  const {
    ref,
    navRef,
    leftScroll,
    setLeftScroll,
    rightScroll,
    setRightScroll,
    left,
    right,
  } = useCategoryNavigation();

  const check = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const scrollLeftAmount = Math.ceil(ref.current.scrollLeft);
    const scrollViewWidth = ref.current.scrollWidth - ref.current.clientWidth;
    setLeftScroll(scrollLeftAmount > 0);
    setRightScroll(
      ref.current.clientWidth < 1500 && scrollLeftAmount < scrollViewWidth
    );
  }, [ref, setLeftScroll, setRightScroll]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const r = ref.current;

    r.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    check();

    return () => {
      r.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [ref, check]);

  const scroll = (amount: number) => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollTo({
      left: ref.current.scrollLeft + amount,
      behavior: 'smooth',
    });
  };

  return (
    <div
      onMouseEnter={() => {
        timeout = setTimeout(() => {
          if (timeout !== null) {
            setOpen(true);
          }
        }, TIMEOUT_DURATION);
      }}
      onMouseLeave={() => {
        if (timeout !== null) {
          clearTimeout(timeout);
          timeout = null;
        }
        setTimeout(() => {
          setOpen(false);
          setIndex(0);
        }, TIMEOUT_DURATION);
      }}
      onFocus={() => {
        setTimeout(() => {
          setOpen(true);
        }, TIMEOUT_DURATION);
      }}
    >
      <nav
        className={cn('mt-4 flex max-w-fit items-center py-2', className)}
        aria-label={t('category.description')}
        ref={navRef}
        {...props}
      >
        {leftScroll && (
          <NavButton
            ref={left}
            onClick={() => scroll(-scrollAmount)}
            icon={ChevronLeftIcon}
            aria-description={t('category.scroll-left')}
          />
        )}

        <ul
          ref={ref}
          className="flex overflow-hidden"
        >
          {categoryData.data.map((item, i) => (
            <NavItem
              text={item.title}
              id={item.id}
              key={item.title}
              onMouseEnter={() => {
                categoryChangeTimeout = setTimeout(() => {
                  setIndex(i);
                }, TIMEOUT_DURATION);
              }}
              onMouseLeave={() => {
                if (categoryChangeTimeout !== null) {
                  clearTimeout(categoryChangeTimeout);
                  timeout = null;
                }
              }}
              onFocus={() => {
                setTimeout(() => {
                  setIndex(i);
                }, TIMEOUT_DURATION);
              }}
            />
          ))}
        </ul>

        {rightScroll && (
          <NavButton
            ref={right}
            onClick={() => scroll(scrollAmount)}
            icon={ChevronRightIcon}
            aria-description={t('category.scroll-right')}
          />
        )}
      </nav>

      <div
        className={cn(
          'mt-2 grid-cols-2 gap-8 rounded-md border border-midnight/20 p-4 lg:grid-cols-3',
          {
            hidden: !(open && category),
            grid: open && category,
          }
        )}
      >
        <div className="relative col-span-2 lg:col-span-2">
          <img
            src={
              category?.image !== undefined
                ? category.image + '?q=80&w=768&auto=format&fit=crop'
                : ''
            }
            className="h-full rounded object-cover lg:aspect-[4] lg:h-auto lg:w-full"
            alt=""
            loading="eager"
          />
          <Link
            to={`/categories/${encodeURIComponent(
              category?.title ?? ''
            )}?id=${category?.id}`}
            className="absolute bottom-2 left-8 ml-2 text-xl font-bold text-neutral-50"
          >
            {category?.title ?? ''}
          </Link>
        </div>

        <div className="col-span-2 mx-auto grid grid-cols-3 gap-4 lg:col-span-1 lg:mx-0">
          {category?.subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              to={`/categories/${encodeURIComponent(subcategory.title)}?id=${
                subcategory.id
              }`}
              className="flex items-center justify-center rounded px-2 py-2 text-center text-sm text-neutral-600 hover:bg-neutral-400/10"
            >
              {subcategory.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryNavigation;
