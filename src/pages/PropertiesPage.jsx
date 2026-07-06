import { PageHeader } from '../components/PageHeader';
import { EmptyState } from '../components/EmptyState';

export function PropertiesPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Properties"
        description="Create and manage properties under hotel groups, with optional brand assignment, settings, modules and PMS configuration."
        actionLabel="New Property"
      />
      <EmptyState
        title="Property module placeholder"
        description="This screen will later connect to GET /properties and POST /hotel-groups/{groupId}/properties."
      />
    </section>
  );
}