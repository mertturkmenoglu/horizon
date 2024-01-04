import Appbar from '@/components/Appbar';
import Banner from '@/components/Banner';
import CategoryFooter from '@/components/CategoryFooter';
import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps): React.ReactElement {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    const lsValue = window.localStorage.getItem('showCookieConsent');
    return lsValue === null || lsValue === 'true';
  });

  if (!isAuthenticated || isLoading || !user) {
    return <></>;
  }

  if (user && !user.emailVerified) {
    console.log({ user });
    return <Navigate to="/verify-email" />;
  }

  return (
    <main className="flex flex-col max-w-screen-2xl mx-auto">
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
        <CategoryFooter />
        <Footer />
      </div>
    </main>
  );
}

export default MainLayout;
