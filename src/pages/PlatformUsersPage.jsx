import { PageHeader } from '../components/PageHeader';
import { EmptyState } from '../components/EmptyState';

export function PlatformUsersPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Platform Users"
        description="Manage internal Enstays users such as Super Admin, Tech Support, Sales and Finance."
        actionLabel="Invite User"
      />
      <EmptyState
        title="Platform user module placeholder"
        description="This screen is reserved for platform_users_tbl and platform auth workflows."
      />
    </section>
  );
}
