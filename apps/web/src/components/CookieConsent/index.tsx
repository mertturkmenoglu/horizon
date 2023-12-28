import { cn } from '@/lib/cn';
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
  if (!open) {
    return <></>;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 px-8 py-4 bg-gray-200 flex flex-col',
        className
      )}
    >
      <div className="mt-2 flex justify-between items-center">
        <div>
          <div className="font-black text-xl text-midnight">
            We value your privacy
          </div>
          <div className="max-w-5xl leading-8 text-midnight">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By clicking "Accept
            All", you consent to our use of cookies.{' '}
            <a
              href="/cookies"
              className="text-blue-500 font-semibold underline"
            >
              Read More
            </a>
          </div>
        </div>

        <div className="flex space-x-4">
          <CookieButton onClick={onCustomize}>Customize</CookieButton>
          <CookieButton onClick={onRejectAll}>Reject All</CookieButton>
          <CookieButton onClick={onAcceptAll}>Accept All</CookieButton>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
