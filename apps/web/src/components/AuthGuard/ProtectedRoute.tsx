import { useAuth } from '@/hooks/useAuth';
import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Only authenticated users can visit.
 */
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Spinner className="size-12" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default ProtectedRoute;
