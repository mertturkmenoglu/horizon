import Appbar from '@/components/Appbar';
import Banner from '@/components/Banner';
import CookieConsent from '@/components/CookieConsent';
import SideNavigation from '@/components/SideNavigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps): React.ReactElement {
  const { isAuthenticated, loading, user } = useAuth();
  const [navCollapsed, setNavCollapsed] = useState(false);
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
    <main className="flex flex-col md:flex-row md:space-x-4 md:overflow-hidden md:h-screen">
      <SideNavigation
        className={cn('hidden md:flex', {
          'md:w-72': !navCollapsed,
          'md:w-20': navCollapsed,
        })}
        collapsed={navCollapsed}
        setCollapsed={setNavCollapsed}
      />

      <div className="flex md:hidden">
        <Appbar className="w-full py-1 px-4" />
      </div>
      <div className="mx-auto w-full md:overflow-y-scroll">
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
