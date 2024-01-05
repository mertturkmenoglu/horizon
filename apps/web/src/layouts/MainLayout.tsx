import Appbar from '@/components/Appbar';
import Banner from '@/components/Banner';
import CategoryFooter from '@/components/CategoryFooter';
import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  isFullWidth?: boolean;
}

function MainLayout({
  children,
  showFooter = true,
  isFullWidth = false,
}: MainLayoutProps): React.ReactElement {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    const lsValue = window.localStorage.getItem('showCookieConsent');
    return lsValue === null || lsValue === 'true';
  });

  if (!isAuthenticated || isLoading || !user) {
    return <></>;
  }

  if (user && !user.emailVerified) {
    return <Navigate to="/verify-email" />;
  }

  return (
    <main
      className={cn('flex flex-col', {
        'max-w-screen-2xl mx-auto': !isFullWidth,
        'w-full px-4': isFullWidth,
      })}
    >
      <Appbar />
      <div className="mx-auto w-full">
        {!user.emailVerified && (
          <Banner
            appearance="warning"
            className="flex items-center"
          >
            <ExclamationTriangleIcon className="size-4" />
            <div className="ml-2">Please verify your email address</div>
          </Banner>
        )}
        <div className="w-full mx-auto px-4 2xl:px-0">{children}</div>
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

        {showFooter && (
          <>
            <CategoryFooter className="mt-32" />
            <Footer />
          </>
        )}
      </div>
    </main>
  );
}

export default MainLayout;
