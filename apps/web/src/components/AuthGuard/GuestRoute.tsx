import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * Only unauthenticated users can visit.
 */
function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (!loading && isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
}

export default GuestRoute;
