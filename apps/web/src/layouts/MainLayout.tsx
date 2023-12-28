import Appbar from '@/components/Appbar';
import CookieConsent from '@/components/CookieConsent';
import { useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps): React.ReactElement {
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    const lsValue = window.localStorage.getItem('showCookieConsent');

    if (lsValue === null) {
      return true;
    }

    return lsValue === 'true';
  });
  return (
    <main>
      <div className="max-w-7xl mx-auto">
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
