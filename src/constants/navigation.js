import {
  Building2,
  Gauge,
  Hotel,
  Layers3,
  PlugZap,
  ShieldCheck,
  UsersRound,
  ScrollText,
} from 'lucide-react';

export const navigationItems = [
  { label: 'Dashboard', path: '/', icon: Gauge },
  { label: 'Hotel Groups', path: '/hotel-groups', icon: Building2 },
  { label: 'Brands', path: '/brands', icon: Layers3 },
  { label: 'Properties', path: '/properties', icon: Hotel },
  { label: 'PMS Providers', path: '/pms-providers', icon: PlugZap },
  { label: 'Platform Users', path: '/platform-users', icon: UsersRound },
  { label: 'Roles & Permissions', path: '/roles-permissions', icon: ShieldCheck },
  { label: 'Audit Logs', path: '/audit-logs', icon: ScrollText },
];
