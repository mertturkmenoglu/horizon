/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PasswordResetRequestPage from './pages/PasswordResetRequestPage';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/reset-password',
    element: <PasswordResetRequestPage />,
  },
]);
