import { PageHeader } from '../components/PageHeader';
import { EmptyState } from '../components/EmptyState';

export function RolesPermissionsPage() {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Roles & Permissions"
        description="Prepare platform, hotel group and property access scopes before role-based features are connected."
        actionLabel="New Role"
      />
      <EmptyState
        title="RBAC module placeholder"
        description="This section will later map to roles_tbl, permissions_tbl, role_permissions_tbl and staff_user_roles_tbl."
      />
    </section>
  );
}