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

const userTypes = ['SUPER_ADMIN', 'TECH_SUPPORT', 'SALES', 'FINANCE'].map((value) => ({
  value,
  label: value.replaceAll('_', ' '),
}));

export function PlatformUsersPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    user_type: 'SUPER_ADMIN',
    password: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const usersApi = useApi(() => api.get('/platform/users'), []);
  const rows = rowsFrom(usersApi.data);

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
      await api.post('/platform/users', form);

      setForm({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        user_type: 'SUPER_ADMIN',
        password: '',
      });

      await usersApi.reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <PageHeader
        title="Platform Users"
        description="Manage internal Enstays users such as Super Admin, Tech Support, Sales and Finance."
        actionLabel="Refresh"
        onAction={usersApi.reload}
      />

      <form onSubmit={submit} className="console-card grid gap-4 p-5 lg:grid-cols-3">
        <Field label="First name" name="first_name" value={form.first_name} onChange={update} required />
        <Field label="Last name" name="last_name" value={form.last_name} onChange={update} />
        <Field label="Email" name="email" value={form.email} onChange={update} type="email" required />
        <Field label="Mobile" name="mobile" value={form.mobile} onChange={update} />
        <Field label="User type" name="user_type" value={form.user_type} onChange={update} options={userTypes} required />
        <Field label="Temporary password" name="password" value={form.password} onChange={update} type="password" required />

        <div className="lg:col-span-3">
          {formError ? (
            <p className="mb-3 rounded-xl border border-enstays-urgentLine bg-enstays-urgentBg px-3 py-2 text-xs text-enstays-urgent">
              {formError}
            </p>
          ) : null}

          <button className="btn-console-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Platform User'}
          </button>
        </div>
      </form>

      {usersApi.loading ? <LoadingState label="Loading platform users..." /> : null}
      {usersApi.error ? <ErrorState error={usersApi.error} onRetry={usersApi.reload} /> : null}

      {!usersApi.loading && !usersApi.error ? (
        <DataTable
          rows={rows}
          empty="No platform users returned yet."
          columns={[
            {
              key: 'name',
              label: 'Name',
              render: (row) => (
                <span className="font-semibold text-enstays-text">
                  {[row.first_name, row.last_name].filter(Boolean).join(' ') || row.email || '—'}
                </span>
              ),
            },
            { key: 'email', label: 'Email' },
            { key: 'mobile', label: 'Mobile' },
            { key: 'user_type', label: 'Type' },
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