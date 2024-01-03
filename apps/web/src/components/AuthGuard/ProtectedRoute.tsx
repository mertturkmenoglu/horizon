import { useAuth } from '@/hooks/useAuth';
import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Only authenticated users can visit.
 */
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (!loading && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Suspense fallback={<></>}>{children}</Suspense>;
}

export default ProtectedRoute;
