import Appbar from '@/components/Appbar';
import Banner from '@/components/Banner';
import CookieConsent from '@/components/CookieConsent';
import { useAuth } from '@/hooks/useAuth';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps): React.ReactElement {
  const { isAuthenticated, loading, user } = useAuth();
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    const lsValue = window.localStorage.getItem('showCookieConsent');
    return lsValue === null || lsValue === 'true';
  });

  if (!isAuthenticated || loading || !user) {
    return <></>;
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto">
        {!user.emailVerified && (
          <Banner
            appearance="warning"
            className="flex items-center"
          >
            <ExclamationTriangleIcon className="size-4" />
            <div className="ml-2">Please verify your email address</div>
          </Banner>
        )}
        <Appbar className="mt-4" />
        <div>{children}</div>
        <CookieConsent
          open={showCookieConsent}
          onAcceptAll={() => {
            window.localStorage.setItem('showCookieConsent', 'false');
            setShowCookieConsent(false);
          }}
          onCustomize={() => {
            window.localStorage.setItem('showCookieConsent', 'false');
            setShowCookieConsent(false);
          }}
          onRejectAll={() => {
            window.localStorage.setItem('showCookieConsent', 'false');
            setShowCookieConsent(false);
          }}
        />
      </div>
    </main>
  );
}

export default MainLayout;
