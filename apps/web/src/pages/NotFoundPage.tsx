import Logo from '@/components/Logo';
import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';

function NotFoundPage(): React.ReactElement {
  const { t } = useTranslation('common', { keyPrefix: 'not-found' });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div></div>
      <Logo />
      <h2 className="text-4xl font-extrabold">Horizon</h2>
      <div className="mt-16 text-2xl font-light text-red-500">
        404 - {t('not-found')}
      </div>

      <a
        href="/"
        className={cn(
          'h-12 w-[18rem] bg-red-500',
          '-rotate-6 -skew-x-[32deg]',
          'shadow-2xl shadow-red-500/80',
          'mt-12 text-2xl text-white',
          'flex items-center px-8',
          'transform transition-all duration-500 ease-in-out',
          'hover:rotate-0 hover:skew-x-0',
          'focus:rotate-0 focus:skew-x-0',
          'focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2'
        )}
      >
        {t('home')}
      </a>
      <a
        href="/help"
        className={cn(
          'h-12 w-[18rem] bg-sky-500',
          '-rotate-6 -skew-x-[32deg]',
          'shadow-2xl shadow-sky-500/80',
          'mt-6 text-2xl text-white',
          'flex items-center px-8',
          'transform transition-all duration-500 ease-in-out',
          'hover:rotate-0 hover:skew-x-0',
          'focus:rotate-0 focus:skew-x-0',
          'focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2'
        )}
      >
        {t('help')}
      </a>
    </div>
  );
}

export default NotFoundPage;
