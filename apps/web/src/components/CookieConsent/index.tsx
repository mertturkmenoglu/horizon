import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CookieButton from './CookieButton';

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
        'fixed bottom-0 left-0 right-0 flex flex-col bg-neutral-100 px-8 py-4 shadow-lg',
        className
      )}
    >
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="text-xl font-black text-midnight">{t('title')}</div>
          <div className="max-w-5xl leading-8 text-midnight">
            {t('body')}{' '}
            <Link
              to="/cookies"
              className="font-semibold text-blue-500 underline"
            >
              {t('more')}
            </Link>
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
