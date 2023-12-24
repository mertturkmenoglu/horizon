/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
]);
