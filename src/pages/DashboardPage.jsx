import { Building2, Hotel, PlugZap, ShieldAlert } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';

const recentItems = [
  ['Taj Hotels', 'Hotel Group created', 'ACTIVE', 'done'],
  ['Taj Goa', 'Property added', 'ACTIVE', 'done'],
  ['Cloudbeds', 'PMS provider draft', 'PENDING', 'progress'],
  ['Digital Key', 'Module disabled by default', 'DISABLED', 'urgent'],
];

const pillClasses = {
  done: 'border-enstays-doneLine bg-enstays-doneBg text-enstays-done',
  progress: 'border-enstays-progressLine bg-enstays-progressBg text-enstays-progress',
  urgent: 'border-enstays-urgentLine bg-enstays-urgentBg text-enstays-urgent',
};

export function DashboardPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Platform Overview"
        description="Start here for Enstays platform health, hotel groups, properties, PMS connectivity and module readiness. Visual theme now follows the dark Enstays Console reference."
        actionLabel="Create Hotel Group"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Hotel Groups" value="12" helper="Chains, independent hotels and operators" icon={Building2} tone="gold" />
        <StatCard title="Properties" value="38" helper="Across all active groups" icon={Hotel} tone="blue" />
        <StatCard title="PMS Connected" value="9" helper="Production and sandbox configs" icon={PlugZap} tone="green" />
        <StatCard title="Open Alerts" value="3" helper="Failed syncs and pending reviews" icon={ShieldAlert} tone="urgent" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="console-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-enstays-line px-[18px] py-4">
            <h2 className="font-serif text-xl font-semibold text-enstays-text">Recent Platform Activity</h2>
            <button className="text-xs font-semibold text-enstays-gold">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-enstays-line bg-enstays-bg2 text-[10.5px] uppercase tracking-[0.07em] text-enstays-text3">
                  <th className="px-4 py-3 font-bold">Name</th>
                  <th className="px-4 py-3 font-bold">Activity</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.map(([name, activity, status, tone]) => (
                  <tr key={`${name}-${activity}`} className="border-b border-enstays-line last:border-b-0 hover:bg-enstays-surface2">
                    <td className="px-4 py-4 font-semibold text-enstays-text">{name}</td>
                    <td className="px-4 py-4 text-enstays-text2">{activity}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold ${pillClasses[tone]}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="console-card border-enstays-goldLine bg-enstays-goldSoft p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-enstays-gold">Build Order</p>
          <h2 className="mt-3 font-serif text-[28px] font-semibold leading-none text-enstays-text">Super Admin first</h2>
          <p className="mt-3 text-[13px] leading-6 text-enstays-text2">
            Create hotel groups, optional brands, properties, PMS providers, capabilities and modules before moving into operations.
          </p>
          <div className="mt-6 space-y-3 text-[13px]">
            {['Hotel Groups', 'Hotel Brands', 'Properties', 'PMS Config', 'Modules'].map((item) => (
              <div key={item} className="rounded-[11px] border border-enstays-line bg-enstays-surface px-4 py-3 font-medium text-enstays-text2">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}