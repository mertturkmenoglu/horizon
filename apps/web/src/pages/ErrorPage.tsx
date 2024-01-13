import Logo from '@/components/Logo';
import { cn } from '@/lib/cn';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteError } from 'react-router-dom';

function ErrorPage(): React.ReactElement {
  const { t } = useTranslation('common', { keyPrefix: 'error' });
  const err = useRouteError();

  const message = useMemo(() => {
    if ((err as any).message !== undefined) {
      return (err as any).message;
    }

    if ((err as any).statusText !== undefined) {
      return (err as any).statusText;
    }

    return t('err');
  }, [err, t]);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <Logo />
      <h1 className="text-4xl font-extrabold">Horizon</h1>
      <div className="mt-16 text-2xl font-light text-red-500">{t('error')}</div>
      <div className="mt-4 text-2xl font-light text-red-500">{message}</div>

      <Link
        to="/"
        className={cn(
          'h-12 w-[18rem] bg-red-600',
          '-rotate-6 -skew-x-[32deg]',
          'shadow-2xl shadow-red-600/80',
          'mt-12 text-2xl text-white',
          'flex items-center px-8',
          'transform transition-all duration-500 ease-in-out',
          'hover:rotate-0 hover:skew-x-0',
          'focus:rotate-0 focus:skew-x-0',
          'focus:outline-none focus:ring focus:ring-red-600 focus:ring-offset-2'
        )}
      >
        {t('home')}
      </Link>
      <Link
        to="/help"
        className={cn(
          'h-12 w-[18rem] bg-sky-600',
          '-rotate-6 -skew-x-[32deg]',
          'shadow-2xl shadow-sky-600/80',
          'mt-6 text-2xl text-white',
          'flex items-center px-8',
          'transform transition-all duration-500 ease-in-out',
          'hover:rotate-0 hover:skew-x-0',
          'focus:rotate-0 focus:skew-x-0',
          'focus:outline-none focus:ring focus:ring-sky-600 focus:ring-offset-2'
        )}
      >
        {t('help')}
      </Link>
    </main>
  );
}

export default ErrorPage;
