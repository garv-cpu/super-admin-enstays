import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { DataTable } from '../components/DataTable';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { StatusBadge } from '../components/StatusBadge';
import { Field } from '../components/Field';
import { api } from '../services/httpClient';
import { useApi } from '../hooks/useApi';
import { rowsFrom } from '../utils/normalizers';

const organizationTypes = [
  'HOTEL_CHAIN',
  'HOTEL_GROUP',
  'INDEPENDENT_HOTEL',
  'RESORT_GROUP',
  'MANAGEMENT_COMPANY',
  'HOSPITALITY_OPERATOR',
  'OTHER',
].map((value) => ({
  value,
  label: value.replaceAll('_', ' '),
}));

export function HotelGroupsPage() {
  const [form, setForm] = useState({
    group_name: '',
    group_code: '',
    organization_type: 'HOTEL_GROUP',
    email: '',
    phone: '',
    country: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { data, loading, error, reload } = useApi(() => api.get('/hotel-groups'), []);
  const rows = rowsFrom(data);

  const update = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError('');

    try {
      await api.post('/hotel-groups', form);
      setForm({
        group_name: '',
        group_code: '',
        organization_type: 'HOTEL_GROUP',
        email: '',
        phone: '',
        country: '',
      });
      await reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <PageHeader
        title="Hotel Groups"
        description="Create and manage the organization layer. Every property belongs to one hotel group or organization."
        actionLabel="Refresh"
        onAction={reload}
      />

      <form onSubmit={submit} className="console-card grid gap-4 p-5 lg:grid-cols-3">
        <Field label="Group name" name="group_name" value={form.group_name} onChange={update} required placeholder="Taj Hotels" />
        <Field label="Group code" name="group_code" value={form.group_code} onChange={update} required placeholder="TAJ" />
        <Field label="Organization type" name="organization_type" value={form.organization_type} onChange={update} options={organizationTypes} required />
        <Field label="Email" name="email" value={form.email} onChange={update} type="email" placeholder="support@example.com" />
        <Field label="Phone" name="phone" value={form.phone} onChange={update} placeholder="+91..." />
        <Field label="Country" name="country" value={form.country} onChange={update} placeholder="India" />

        <div className="lg:col-span-3">
          {formError ? (
            <p className="mb-3 rounded-xl border border-enstays-urgentLine bg-enstays-urgentBg px-3 py-2 text-xs text-enstays-urgent">
              {formError}
            </p>
          ) : null}

          <button className="btn-console-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Hotel Group'}
          </button>
        </div>
      </form>

      {loading ? <LoadingState label="Loading hotel groups..." /> : null}
      {error ? <ErrorState error={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <DataTable
          rows={rows}
          empty="No hotel groups found. Create the first one above."
          columns={[
            {
              key: 'group_name',
              label: 'Group',
              render: (row) => (
                <span className="font-semibold text-enstays-text">
                  {row.group_name || row.name || '—'}
                </span>
              ),
            },
            { key: 'group_code', label: 'Code' },
            { key: 'organization_type', label: 'Organization Type' },
            { key: 'email', label: 'Email' },
            {
              key: 'status',
              label: 'Status',
              render: (row) => <StatusBadge value={row.status} />,
            },
          ]}
        />
      ) : null}
    </section>
  );
}