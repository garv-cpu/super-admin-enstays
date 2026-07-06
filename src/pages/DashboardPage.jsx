import { Activity, Building2, Hotel, PlugZap, ShieldAlert } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/httpClient';
import { useApi } from '../hooks/useApi';
import { rowsFrom } from '../utils/normalizers';

export function DashboardPage() {
  const { data, loading, error, reload } = useApi(async () => {
    const [dashboard, health, hierarchy] = await Promise.allSettled([
      api.get('/platform/dashboard'),
      api.get('/health'),
      api.get('/runtime/hierarchy'),
    ]);

    return {
      dashboard: dashboard.status === 'fulfilled' ? dashboard.value : null,
      health: health.status === 'fulfilled' ? health.value : null,
      hierarchy: hierarchy.status === 'fulfilled' ? hierarchy.value : null,
    };
  }, []);

  const dashboard = data?.dashboard || {};
  const activityRows = rowsFrom(dashboard.recent_activity || dashboard.activity || dashboard.recent || []);

  const counts = {
    groups:
      dashboard.total_groups ??
      dashboard.groups_count ??
      dashboard.hotel_groups ??
      dashboard.counts?.hotel_groups ??
      '—',

    properties:
      dashboard.total_properties ??
      dashboard.properties_count ??
      dashboard.properties ??
      dashboard.counts?.properties ??
      '—',

    pms:
      dashboard.pms_connected ??
      dashboard.connected_pms ??
      dashboard.counts?.pms_connected ??
      '—',

    alerts:
      dashboard.open_alerts ??
      dashboard.failed_syncs ??
      dashboard.counts?.open_alerts ??
      '—',
  };

  return (
    <section className="space-y-8">
      <PageHeader
        title="Platform Overview"
        description="Live Super Admin dashboard connected to Enstays API. Counts come from /platform/dashboard and system checks use /health and /runtime/hierarchy."
        actionLabel="Refresh"
        onAction={reload}
      />

      {loading ? <LoadingState label="Loading platform dashboard..." /> : null}
      {error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Hotel Groups" value={counts.groups} helper="Groups / organizations" icon={Building2} tone="gold" />
            <StatCard title="Properties" value={counts.properties} helper="All platform properties" icon={Hotel} tone="blue" />
            <StatCard title="PMS Connected" value={counts.pms} helper="Connected PMS configs" icon={PlugZap} tone="green" />
            <StatCard title="Open Alerts" value={counts.alerts} helper="Failed syncs or pending reviews" icon={ShieldAlert} tone="urgent" />
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="console-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-enstays-line px-[18px] py-4">
                <h2 className="font-serif text-xl font-semibold text-enstays-text">
                  Recent Platform Activity
                </h2>
                <span className="text-xs font-semibold text-enstays-gold">
                  /platform/dashboard
                </span>
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
                    {activityRows.length ? (
                      activityRows.map((item, index) => (
                        <tr
                          key={item.id || item.uuid || index}
                          className="border-b border-enstays-line last:border-b-0 hover:bg-enstays-surface2"
                        >
                          <td className="px-4 py-4 font-semibold text-enstays-text">
                            {item.name || item.title || item.entity_name || 'Activity'}
                          </td>
                          <td className="px-4 py-4 text-enstays-text2">
                            {item.activity || item.message || item.description || item.action || '—'}
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge value={item.status || item.sync_status || 'ACTIVE'} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-4 py-10 text-center text-enstays-text3">
                          No recent activity returned yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="console-card border-enstays-goldLine bg-enstays-goldSoft p-6">
              <div className="flex items-center gap-2 text-enstays-gold">
                <Activity size={18} />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
                  System status
                </p>
              </div>

              <h2 className="mt-3 font-serif text-[28px] font-semibold leading-none text-enstays-text">
                API connected
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-enstays-text2">
                Health, hierarchy and dashboard endpoints are wired safely. Missing backend data shows as empty state, not a crash.
              </p>

              <div className="mt-6 space-y-3 text-[13px]">
                <div className="rounded-[11px] border border-enstays-line bg-enstays-surface px-4 py-3 text-enstays-text2">
                  Health: {data?.health ? 'Available' : 'Not returned'}
                </div>
                <div className="rounded-[11px] border border-enstays-line bg-enstays-surface px-4 py-3 text-enstays-text2">
                  Hierarchy: {data?.hierarchy ? 'Available' : 'Not returned'}
                </div>
                <div className="rounded-[11px] border border-enstays-line bg-enstays-surface px-4 py-3 text-enstays-text2">
                  Mode: Super Admin MVP
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}