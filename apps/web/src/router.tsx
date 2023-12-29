/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/AuthGuard/ProtectedRoute';
import GuestRoute from './components/AuthGuard/GuestRoute';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const PasswordResetRequestPage = React.lazy(
  () => import('./pages/PasswordResetRequestPage')
);
const CategoriesPage = React.lazy(
  () => import('./pages/Services/CategoriesPage')
);
const UserPage = React.lazy(() => import('./pages/UserPage'));
const MePage = React.lazy(() => import('./pages/MePage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GuestRoute>
        <LandingPage />
      </GuestRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <GuestRoute>
        <PasswordResetRequestPage />
      </GuestRoute>
    ),
  },
  {
    path: '/services/categories',
    element: (
      <ProtectedRoute>
        <CategoriesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user/:username',
    element: (
      <ProtectedRoute>
        <UserPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/me',
    element: (
      <ProtectedRoute>
        <MePage />
      </ProtectedRoute>
    ),
  },
]);
