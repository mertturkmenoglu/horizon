import { cn } from '@/lib/cn';
import CookieButton from './CookieButton';
import { useTranslation } from 'react-i18next';

interface CookieConsentProps {
  open: boolean;
  onRejectAll: () => void;
  onAcceptAll: () => void;
  onCustomize: () => void;
  className?: string;
}

function CookieConsent({
  open,
  onRejectAll,
  onAcceptAll,
  onCustomize,
  className,
}: CookieConsentProps): React.ReactElement {
  const { t } = useTranslation('common', { keyPrefix: 'cookie' });

  if (!open) {
    return <></>;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 px-8 py-4 bg-neutral-100 flex flex-col shadow-lg',
        className
      )}
    >
      <div className="mt-2 flex justify-between items-center">
        <div>
          <div className="font-black text-xl text-midnight">{t('title')}</div>
          <div className="max-w-5xl leading-8 text-midnight">
            {t('body')}{' '}
            <a
              href="/cookies"
              className="text-blue-500 font-semibold underline"
            >
              {t('more')}
            </a>
          </div>
        </div>

        <div className="flex space-x-4">
          <CookieButton onClick={onCustomize}>{t('customize')}</CookieButton>
          <CookieButton onClick={onRejectAll}>{t('reject')}</CookieButton>
          <CookieButton onClick={onAcceptAll}>{t('accept')}</CookieButton>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
