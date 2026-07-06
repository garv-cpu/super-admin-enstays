import { PageHeader } from '../components/PageHeader';
import { EmptyState } from '../components/EmptyState';

export function PmsProvidersPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="PMS Providers"
        description="Manage PMS provider master records, connection setup and capability matrix for standalone, PMS and hybrid execution."
        actionLabel="New PMS Provider"
      />
      <EmptyState
        title="PMS provider module placeholder"
        description="This section will later use /pms/providers, /properties/{id}/pms-config and capability APIs."
      />
    </section>
  );
}
