import Appbar from '@/components/Appbar';
import Banner from '@/components/Banner';
import CookieConsent from '@/components/CookieConsent';
import SideNavigation from '@/components/SideNavigation';
import { useAuth } from '@/hooks/useAuth';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

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

  if (user && !user.emailVerified) {
    console.log({ user });
    return <Navigate to="/verify-email" />;
  }

  return (
    <main className="md:grid md:grid-cols-10 md:gap-4">
      <div className="hidden md:flex md:col-span-2 2xl:col-span-1 w-full">
        <SideNavigation />
      </div>
      <div className="flex md:hidden w-full lg:w-0">
        <Appbar className="w-full py-1 px-4" />
      </div>
      <div className="md:col-span-8 2xl:col-span-9 mx-auto w-full">
        {!user.emailVerified && (
          <Banner
            appearance="warning"
            className="flex items-center"
          >
            <ExclamationTriangleIcon className="size-4" />
            <div className="ml-2">Please verify your email address</div>
          </Banner>
        )}
        <div className="w-full mx-auto">{children}</div>
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
