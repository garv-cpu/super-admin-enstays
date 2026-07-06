import { PageHeader } from '../components/PageHeader';
import { EmptyState } from '../components/EmptyState';

export function HotelGroupsPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Hotel Groups"
        description="Manage the company or organization layer. Every property must belong to one hotel group."
        actionLabel="New Hotel Group"
      />
      <EmptyState
        title="Hotel group module placeholder"
        description="Connect this screen later to POST /hotel-groups and GET /hotel-groups when backend work starts."
      />
    </section>
  );
}
