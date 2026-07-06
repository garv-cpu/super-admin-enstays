import { PageHeader } from '../components/PageHeader';
import { EmptyState } from '../components/EmptyState';

export function AuditLogsPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Audit Logs"
        description="Track login history, PMS sync logs and important platform activities from one admin surface."
      />
      <EmptyState
        title="Audit log module placeholder"
        description="This screen is ready for /audit/login-history and /audit/pms-sync-logs once backend APIs are built."
      />
    </section>
  );
}
