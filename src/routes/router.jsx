import { createBrowserRouter } from 'react-router-dom';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';
import { AuditLogsPage } from '../pages/AuditLogsPage';
import { BrandsPage } from '../pages/BrandsPage';
import { DashboardPage } from '../pages/DashboardPage';
import { HotelGroupsPage } from '../pages/HotelGroupsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PlatformUsersPage } from '../pages/PlatformUsersPage';
import { PmsProvidersPage } from '../pages/PmsProvidersPage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { RolesPermissionsPage } from '../pages/RolesPermissionsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SuperAdminLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'hotel-groups', element: <HotelGroupsPage /> },
      { path: 'brands', element: <BrandsPage /> },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'pms-providers', element: <PmsProvidersPage /> },
      { path: 'platform-users', element: <PlatformUsersPage /> },
      { path: 'roles-permissions', element: <RolesPermissionsPage /> },
      { path: 'audit-logs', element: <AuditLogsPage /> },
    ],
  },
]);
