import { cn } from '@/lib/cn';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';

import React from 'react';
import Menu from './Menu';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface LandingNavbarProps {
  className?: string;
}

function LandingNavbar({ className }: LandingNavbarProps): React.ReactElement {
  const { t } = useTranslation('landing');
  return (
    <nav
      className={cn(
        'mx-auto flex w-full items-center justify-between px-4 py-1',
        className
      )}
    >
      <div className="flex items-center space-x-8">
        <Link
          to="/"
          className="inline-flex items-center text-2xl text-midnight"
        >
          <Logo className="size-12" />
          <h1 className="ml-4 font-medium">Horizon</h1>
        </Link>

        <Menu />
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/demo"
          className="text-sm text-neutral-500 hover:underline"
        >
          {t('request-demo')}
        </Link>

        <div className="h-8 w-[1px] bg-midnight/50" />
        <Link
          to="/login"
          className="flex items-center space-x-2 rounded-md bg-midnight px-4 py-2 text-sm font-semibold text-white"
        >
          <span>{t('get-started')}</span>
          <ArrowRightIcon className="size-4 animate-pulse" />
        </Link>
      </div>
    </nav>
  );
}

export default LandingNavbar;
