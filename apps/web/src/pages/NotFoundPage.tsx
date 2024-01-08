import Logo from '@/components/Logo';
import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';

function NotFoundPage(): React.ReactElement {
  const { t } = useTranslation('common', { keyPrefix: 'not-found' });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div></div>
      <Logo />
      <h2 className="text-4xl font-extrabold">Horizon</h2>
      <div className="text-red-500 text-2xl font-light mt-16">
        404 - {t('not-found')}
      </div>

      <a
        href="/"
        className={cn(
          'bg-red-500 w-[18rem] h-12',
          '-skew-x-[32deg] -rotate-6',
          'shadow-2xl shadow-red-500/80',
          'mt-12 text-white text-2xl',
          'flex items-center px-8',
          'transform transition-all ease-in-out duration-500',
          'hover:skew-x-0 hover:rotate-0',
          'focus:skew-x-0 focus:rotate-0',
          'focus:ring focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
        )}
      >
        {t('home')}
      </a>
      <a
        href="/help"
        className={cn(
          'bg-sky-500 w-[18rem] h-12',
          '-skew-x-[32deg] -rotate-6',
          'shadow-2xl shadow-sky-500/80',
          'mt-6 text-white text-2xl',
          'flex items-center px-8',
          'transform transition-all ease-in-out duration-500',
          'hover:skew-x-0 hover:rotate-0',
          'focus:skew-x-0 focus:rotate-0',
          'focus:ring focus:ring-sky-500 focus:ring-offset-2 focus:outline-none'
        )}
      >
        {t('help')}
      </a>
    </div>
  );
}

export default NotFoundPage;
