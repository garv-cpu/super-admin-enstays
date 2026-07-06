import { PageHeader } from '../components/PageHeader';
import { EmptyState } from '../components/EmptyState';

export function BrandsPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Hotel Brands"
        description="Optional brand layer under a hotel group. A property may belong to a brand, but the brand must belong to the same group."
        actionLabel="New Brand"
      />
      <EmptyState
        title="Hotel brand module placeholder"
        description="Use this section for hotel_brands_tbl and the group-brand-property relationship introduced by the latest schema."
      />
    </section>
  );
}
