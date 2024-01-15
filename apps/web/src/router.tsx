/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/AuthGuard/ProtectedRoute';
import GuestRoute from './components/AuthGuard/GuestRoute';

const CategoriesPage = React.lazy(
  () => import('./pages/Categories/CategoriesPage')
);
const CategoryListingPage = React.lazy(
  () => import('./pages/Categories/CategoryListingPage')
);
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));
const ExplorePage = React.lazy(() => import('./pages/ExplorePage'));
const HelpPage = React.lazy(() => import('./pages/HelpPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const MePage = React.lazy(() => import('./pages/MePage'));
const MessagesPage = React.lazy(() => import('./pages/MessagesPage'));
const MyServicesPage = React.lazy(() => import('./pages/MyServices'));
const NewServicePage = React.lazy(
  () => import('./pages/Services/NewServicePage')
);
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage'));
const OverviewPage = React.lazy(() => import('./pages/OverviewPage'));
const PasswordResetRequestPage = React.lazy(
  () => import('./pages/PasswordResetRequestPage')
);
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const SchedulePage = React.lazy(() => import('./pages/SchedulePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const ServiceDetailPage = React.lazy(
  () => import('./pages/Services/ServiceDetailPage')
);
const ServicesPage = React.lazy(() => import('./pages/Services/ServicesPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const SettingsOutlet = React.lazy(() => import('./components/Settings/Outlet'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const UserPage = React.lazy(() => import('./pages/UserPage'));
const VerifyEmailRedirect = React.lazy(
  () => import('./pages/VerifyEmailRedirect')
);
const VerifyEmailRequestPage = React.lazy(
  () => import('./pages/VerifyEmailRequestPage')
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GuestRoute>
        <LandingPage />
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
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
    path: '/services/:id',
    element: (
      <ProtectedRoute>
        <ServiceDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/categories',
    element: (
      <ProtectedRoute>
        <CategoriesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/categories/:slug',
    element: (
      <ProtectedRoute>
        <CategoryListingPage />
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
    children: [
      {
        path: ':tab',
        element: (
          <ProtectedRoute>
            <SettingsOutlet />
          </ProtectedRoute>
        ),
      },
    ],
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
    element: (
      <ProtectedRoute>
        <HelpPage />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute>
        <TermsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/search',
    element: (
      <ProtectedRoute>
        <SearchPage />
      </ProtectedRoute>
    ),
  },
]);
