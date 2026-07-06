import { NavLink, Outlet } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { navigationItems } from '../constants/navigation';

export function SuperAdminLayout() {
  return (
    <div className="min-h-screen bg-enstays-ivory text-black">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-black/5 bg-enstays-green px-5 py-6 text-black lg:block">
        <div className="rounded-3xl bg-black/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-enstays-gold">Enstays</p>
          <h1 className="mt-2 text-2xl font-semibold">Super Admin</h1>
          <p className="mt-2 text-sm leading-6 text-black/70">Platform control for groups, brands, properties, PMS and modules.</p>
        </div>

        <nav className="mt-8 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-white text-enstays-green' : 'text-black/75 hover:bg-white/10 hover:text-black/100'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-black/5 bg-enstays-ivory/90 px-5 py-4 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm md:flex md:w-[420px]">
              <Search size={18} className="text-enstays-slate" />
              <input className="w-full bg-transparent text-sm outline-none placeholder:text-enstays-slate" placeholder="Search groups, properties, PMS logs..." />
            </div>
            <div className="lg:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-enstays-gold">Enstays</p>
              <h2 className="text-lg font-semibold text-enstays-green">Super Admin</h2>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="rounded-2xl bg-white p-3 text-enstays-green shadow-sm">
                <Bell size={18} />
              </button>
              <div className="rounded-2xl bg-white px-4 py-2 shadow-sm">
                <p className="text-sm font-semibold text-enstays-green">Platform Owner</p>
                <p className="text-xs text-enstays-slate">SUPER_ADMIN</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-5 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
