import { cn } from '@/lib/cn';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Logo2 from '../Logo2';
import { Trans, useTranslation } from 'react-i18next';

interface FancyGreetingProps {
  className?: string;
}

function FancyGreeting({ className }: FancyGreetingProps): React.ReactElement {
  const { t } = useTranslation('auth');

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center',
        className
      )}
    >
      <a
        href="/"
        className="absolute left-8 top-8 flex items-center space-x-4 hover:underline"
      >
        <ArrowLeftIcon className="size-6" />
        <span>{t('home')}</span>
      </a>
      <img
        src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="z-50 hidden rounded shadow-2xl lg:flex lg:w-[384px]"
      />
      <div className="z-50 mt-32 w-[384px] flex-col items-start text-start lg:mt-0">
        <div className="mt-8 text-sm text-gray-500">{t('get-started')}</div>
        <div className="mt-2 text-2xl font-bold">
          <Trans
            i18nKey="slogan"
            defaults={t('slogan')}
            components={{ span: <span className="text-sky-600" /> }}
          />
        </div>
      </div>

      <Logo2
        className="hidden lg:absolute lg:top-[30rem] lg:block lg:h-20"
        dist={6}
      />
    </div>
  );
}

export default FancyGreeting;
