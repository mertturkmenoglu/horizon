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
const ServicesPage = React.lazy(() => import('./pages/Services/ServicesPage'));
const NewServicePage = React.lazy(
  () => import('./pages/Services/NewServicePage')
);
const VerifyEmailRequestPage = React.lazy(
  () => import('./pages/VerifyEmailRequestPage')
);
const VerifyEmailRedirect = React.lazy(
  () => import('./pages/VerifyEmailRedirect')
);
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const MyServicesPage = React.lazy(() => import('./pages/MyServices'));
const ExplorePage = React.lazy(() => import('./pages/ExplorePage'));
const HelpPage = React.lazy(() => import('./pages/HelpPage'));
const MessagesPage = React.lazy(() => import('./pages/MessagesPage'));
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage'));
const OverviewPage = React.lazy(() => import('./pages/OverviewPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const SchedulePage = React.lazy(() => import('./pages/SchedulePage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));

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
    path: '/services',
    element: (
      <ProtectedRoute>
        <ServicesPage />
      </ProtectedRoute>
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
    path: '/services/new',
    element: (
      <ProtectedRoute>
        <NewServicePage />
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
  {
    path: '/verify-email',
    element: (
      <ProtectedRoute>
        <VerifyEmailRequestPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/verify-email/:code',
    element: <VerifyEmailRedirect />,
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/my-services',
    element: (
      <ProtectedRoute>
        <MyServicesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/explore',
    element: (
      <ProtectedRoute>
        <ExplorePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/help',
    element: <HelpPage />,
  },
  {
    path: '/messages',
    element: (
      <ProtectedRoute>
        <MessagesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications',
    element: (
      <ProtectedRoute>
        <NotificationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/overview',
    element: (
      <ProtectedRoute>
        <OverviewPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
  },
  {
    path: '/schedule',
    element: (
      <ProtectedRoute>
        <SchedulePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/terms',
    element: <TermsPage />,
  },
]);
