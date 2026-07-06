import { PageHeader } from '../components/PageHeader';
import { DataTable } from '../components/DataTable';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/httpClient';
import { useApi } from '../hooks/useApi';
import { rowsFrom } from '../utils/normalizers';

export function AuditLogsPage() {
  const auditApi = useApi(async () => {
    const [syncLogs, loginHistory, activity, brandChanges] = await Promise.allSettled([
      api.get('/audit/pms-sync-logs'),
      api.get('/audit/login-history'),
      api.get('/audit/activity'),
      api.get('/audit/brand-changes'),
    ]);

    return {
      syncLogs: syncLogs.status === 'fulfilled' ? syncLogs.value : null,
      loginHistory: loginHistory.status === 'fulfilled' ? loginHistory.value : null,
      activity: activity.status === 'fulfilled' ? activity.value : null,
      brandChanges: brandChanges.status === 'fulfilled' ? brandChanges.value : null,
    };
  }, []);

  const syncRows = rowsFrom(auditApi.data?.syncLogs);
  const loginData = auditApi.data?.loginHistory || {};

  const loginRows = [
    ...rowsFrom(loginData.platform).map((row) => ({
      ...row,
      login_surface: 'PLATFORM',
    })),
    ...rowsFrom(loginData.staff).map((row) => ({
      ...row,
      login_surface: 'STAFF',
    })),
    ...rowsFrom(loginData.guest).map((row) => ({
      ...row,
      login_surface: 'GUEST',
    })),
  ];

  return (
    <section className="space-y-8">
      <PageHeader
        title="Audit Logs"
        description="PMS sync logs, login history and Super Admin placeholder audit streams."
        actionLabel="Refresh"
        onAction={auditApi.reload}
      />

      {auditApi.loading ? <LoadingState label="Loading audit logs..." /> : null}
      {auditApi.error ? <ErrorState error={auditApi.error} onRetry={auditApi.reload} /> : null}

      {!auditApi.loading && !auditApi.error ? (
        <>
          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-enstays-text">
              PMS Sync Logs
            </h2>

            <DataTable
              rows={syncRows}
              empty="No PMS sync logs returned yet."
              columns={[
                { key: 'property_id', label: 'Property ID' },
                { key: 'entity_type', label: 'Entity' },
                { key: 'request_method', label: 'Method' },
                { key: 'http_status', label: 'HTTP' },
                {
                  key: 'sync_status',
                  label: 'Status',
                  render: (row) => <StatusBadge value={row.sync_status} />,
                },
                { key: 'synced_at', label: 'Synced At' },
              ]}
            />
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-enstays-text">
              Login History
            </h2>

            <DataTable
              rows={loginRows}
              empty="No login history returned yet."
              columns={[
                { key: 'login_surface', label: 'Surface' },
                { key: 'ip_address', label: 'IP' },
                { key: 'location', label: 'Location' },
                {
                  key: 'login_status',
                  label: 'Status',
                  render: (row) => <StatusBadge value={row.login_status || 'SUCCESS'} />,
                },
                { key: 'login_at', label: 'Login At' },
              ]}
            />
          </div>
        </>
      ) : null}
    </section>
  );
}