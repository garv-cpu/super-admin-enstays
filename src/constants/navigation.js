import {
  Activity,
  Building2,
  Hotel,
  LayoutDashboard,
  PlugZap,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';

export const navigationItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Hotel Groups', path: '/hotel-groups', icon: Building2 },
  { label: 'Hotel Brands', path: '/brands', icon: ShieldCheck },
  { label: 'Properties', path: '/properties', icon: Hotel },
  { label: 'PMS Providers', path: '/pms-providers', icon: PlugZap },
  { label: 'Platform Users', path: '/platform-users', icon: Users },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Audit Logs', path: '/audit-logs', icon: Activity },
];