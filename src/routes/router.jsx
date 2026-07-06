import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { HotelGroupsPage } from '../pages/HotelGroupsPage';
import { BrandsPage } from '../pages/BrandsPage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { PmsProvidersPage } from '../pages/PmsProvidersPage';
import { PlatformUsersPage } from '../pages/PlatformUsersPage';
import { RolesPermissionsPage } from '../pages/RolesPermissionsPage';
import { AuditLogsPage } from '../pages/AuditLogsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { booting, isAuthenticated } = useAuth();

  if (booting) {
    return (
      <div className="console-shell grid min-h-screen place-items-center text-enstays-text">
        <div className="console-card p-8 text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-enstays-line border-t-enstays-gold" />
          Checking session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

function PublicRoute({ children }) {
  const { booting, isAuthenticated } = useAuth();

  if (booting) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'hotel-groups', element: <HotelGroupsPage /> },
      { path: 'brands', element: <BrandsPage /> },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'pms-providers', element: <PmsProvidersPage /> },
      { path: 'platform-users', element: <PlatformUsersPage /> },
      { path: 'settings', element: <RolesPermissionsPage /> },
      { path: 'audit-logs', element: <AuditLogsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);