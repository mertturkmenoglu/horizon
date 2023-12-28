import { useAuth } from '@/hooks/useAuth';
import React from 'react';
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

  if (loading) {
    return <></>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
