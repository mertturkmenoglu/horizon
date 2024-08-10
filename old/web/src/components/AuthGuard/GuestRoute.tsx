import { useAuth } from '@/hooks/useAuth';
import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

export interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * Only unauthenticated users can visit.
 */
function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Suspense fallback={<></>}>{children}</Suspense>;
}

export default GuestRoute;
