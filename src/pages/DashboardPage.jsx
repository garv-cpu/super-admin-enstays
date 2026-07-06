import { Building2, Hotel, PlugZap, ShieldAlert } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';

const recentItems = [
  ['Taj Hotels', 'Hotel Group created', 'ACTIVE'],
  ['Taj Goa', 'Property added', 'ACTIVE'],
  ['Cloudbeds', 'PMS provider draft', 'PENDING'],
  ['Digital Key', 'Module disabled by default', 'DISABLED'],
];

export function DashboardPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Platform Overview"
        description="Start here for Enstays platform health, hotel groups, properties, PMS connectivity and module readiness."
        actionLabel="Create Hotel Group"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Hotel Groups" value="12" helper="Chains, independent hotels and operators" icon={Building2} />
        <StatCard title="Properties" value="38" helper="Across all active groups" icon={Hotel} />
        <StatCard title="PMS Connected" value="9" helper="Production and sandbox configs" icon={PlugZap} />
        <StatCard title="Open Alerts" value="3" helper="Failed syncs and pending reviews" icon={ShieldAlert} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-enstays-green">Recent Platform Activity</h2>
            <button className="text-sm font-semibold text-enstays-blue">View all</button>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-enstays-green text-black">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Activity</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.map(([name, activity, status]) => (
                  <tr key={`${name}-${activity}`} className="border-t border-black/5">
                    <td className="px-4 py-4 font-medium text-enstays-ink">{name}</td>
                    <td className="px-4 py-4 text-enstays-slate">{activity}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-enstays-ivory px-3 py-1 text-xs font-semibold text-enstays-green">{status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-enstays-green p-6 text-black shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-enstays-gold">Build Order</p>
          <h2 className="mt-3 text-2xl font-semibold">Super Admin first</h2>
          <p className="mt-3 text-sm leading-6 text-black/75">
            Create hotel groups, optional brands, properties, PMS providers, capabilities and modules before moving into operations.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            {['Hotel Groups', 'Hotel Brands', 'Properties', 'PMS Config', 'Modules'].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 px-4 py-3">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
