import { cn } from '@/lib/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect } from 'react';
import { items } from './categories';
import NavItem from './NavItem';
import NavButton from './NavButton';
import { useCategoryNavigation } from './useCategoryNavigation';

export type CategoryNavigationProps = React.ComponentPropsWithoutRef<'nav'>;

function CategoryNavigation({
  className,
  ...props
}: CategoryNavigationProps): React.ReactElement {
  const scrollAmount = 256;
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
    <nav
      className={cn('flex items-center max-w-fit py-2 mt-4', className)}
      ref={navRef}
      {...props}
    >
      {leftScroll && (
        <NavButton
          ref={left}
          onClick={() => scroll(-scrollAmount)}
          icon={ChevronLeftIcon}
        />
      )}

      <ul
        ref={ref}
        className="flex overflow-hidden"
      >
        {items.map((item) => (
          <NavItem
            text={item}
            key={item}
          />
        ))}
      </ul>

      {rightScroll && (
        <NavButton
          ref={right}
          onClick={() => scroll(scrollAmount)}
          icon={ChevronRightIcon}
        />
      )}
    </nav>
  );
}

export default CategoryNavigation;
