import { NavLink, Outlet } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { navigationItems } from '../constants/navigation';

export function SuperAdminLayout() {
  return (
    <div className="console-shell h-screen overflow-hidden text-enstays-text lg:grid lg:grid-cols-[248px_1fr] lg:grid-rows-[64px_1fr]">
      <header className="z-30 col-span-full flex h-16 shrink-0 items-center gap-4 border-b border-enstays-line bg-enstays-bg2 px-5 shadow-console">
        <div className="flex w-[228px] shrink-0 items-center gap-3">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-[linear-gradient(145deg,#E0B255,#D4A94E_50%,#9A6F1E)] text-enstays-bg2 shadow-gold">
            <span className="font-serif text-2xl font-bold leading-none">E</span>
          </div>

          <div>
            <p className="font-serif text-[19px] font-bold leading-none text-enstays-text">
              Enstays
            </p>
            <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-enstays-gold">
              Console
            </p>
          </div>
        </div>

        <div className="hidden min-w-0 items-center gap-3 rounded-[11px] border border-enstays-line bg-enstays-surface px-3 py-2 text-left md:flex">
          <div className="min-w-0">
            <p className="max-w-[240px] truncate text-[13px] font-semibold text-enstays-text">
              Enstays Platform
            </p>
            <p className="text-[10px] text-enstays-text3">
              Super Admin · Manual mode
            </p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="hidden items-center gap-2 rounded-full border border-enstays-progressLine bg-enstays-progressBg px-3 py-2 text-[11.5px] font-semibold text-enstays-progress md:inline-flex">
          <span className="h-[7px] w-[7px] rounded-full bg-enstays-progress" />
          PMS not connected · Manual
        </div>

        <button className="relative flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-enstays-line bg-enstays-surface text-enstays-text transition hover:border-enstays-lineStrong hover:text-enstays-gold">
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-enstays-bg2 bg-enstays-urgent px-1 text-[10px] font-bold text-[#1a0a08]">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 rounded-full border border-enstays-line bg-enstays-surface py-1 pl-1 pr-3">
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-enstays-gold text-sm font-bold text-enstays-bg2">
            S
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-[12.5px] font-semibold text-enstays-text">
              Platform Owner
            </p>
            <p className="text-[10px] font-semibold text-enstays-gold">
              SUPER_ADMIN
            </p>
          </div>
        </div>
      </header>

      <aside className="hidden min-h-0 flex-col overflow-hidden border-r border-enstays-line bg-enstays-bg2 lg:flex">
  <div className="m-4 rounded-[13px] border border-enstays-goldLine bg-enstays-goldSoft p-[13px]">
    <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-enstays-gold">
      Signed in as
    </p>
    <p className="mt-1 text-[14.5px] font-semibold text-enstays-text">
      Super Admin
    </p>
    <p className="mt-2 text-[11px] font-semibold text-enstays-gold">
      Platform role
    </p>
  </div>

  <nav className="min-h-0 flex-1 overflow-y-auto px-[10px] pb-6">
    <p className="px-3 pb-2 pt-4 text-[9.5px] font-bold uppercase tracking-[0.12em] text-enstays-text3">
      Platform
    </p>

    <div className="space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'console-nav-link console-nav-link-active' : 'console-nav-link'
            }
          >
            <Icon size={19} className="shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  </nav>

  <div className="mt-auto shrink-0 border-t border-enstays-line bg-enstays-bg2 p-4">
    <div className="flex items-center gap-2 text-[11.5px] text-enstays-text3">
      <span className="h-2 w-2 rounded-full bg-enstays-done" />
      All systems operational
    </div>
    <p className="mt-2 font-mono text-[10px] text-enstays-text3">
      Enstays Console v0.1
    </p>
  </div>
</aside>

      <section className="min-h-0 overflow-hidden lg:col-start-2 lg:row-start-2">
        <div className="border-b border-enstays-line bg-enstays-bg/60 px-5 py-4 backdrop-blur md:px-8 lg:hidden">
          <div className="flex items-center gap-3 rounded-[11px] border border-enstays-line bg-enstays-surface px-4 py-3">
            <Search size={18} className="text-enstays-gold" />
            <input
              className="w-full bg-transparent text-sm text-enstays-text outline-none placeholder:text-enstays-text3"
              placeholder="Search groups, properties, PMS logs..."
            />
          </div>
        </div>

        <main className="h-full overflow-y-auto overscroll-contain px-5 py-8 md:px-8">
          <div className="mx-auto max-w-[1320px]">
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
}