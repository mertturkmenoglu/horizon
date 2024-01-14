import { cn } from '@/lib/cn';
import { HomeIcon } from '@heroicons/react/24/outline';
import { Slash } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export type TBreadcrumbItem = {
  text: string;
  href: string;
  capitalize?: boolean;
};

type El = React.ElementRef<'nav'>;
type Props = React.ComponentPropsWithoutRef<'nav'> & {
  items: TBreadcrumbItem[];
};

const Breadcrumb = React.forwardRef<El, Props>(
  ({ className, items, ...props }, ref) => {
    const { t } = useTranslation('common');
    return (
      <nav
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        <ul className="flex list-none flex-wrap items-end space-x-2">
          <li>
            <Link to="/home">
              <HomeIcon className="size-6 text-midnight" />
              <span className="sr-only">{t('home')}</span>
            </Link>
          </li>

          {items.map((item) => (
            <li
              key={item.href}
              className="flex items-center space-x-2"
            >
              <Slash className="size-4 -rotate-12" />
              <Link
                to={item.href}
                className={cn('hover:underline', {
                  capitalize: item.capitalize,
                })}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
