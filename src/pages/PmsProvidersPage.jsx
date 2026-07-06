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

const providers = [
  'ORACLE_OHIP',
  'HOTELOGIKS',
  'ORACLE_OPERA',
  'ORACLE_SIMPHONY',
  'CLOUDBEDS',
  'MEWS',
  'STAYNTOUCH',
  'PROTEL',
  'APALEO',
  'OTHER',
].map((value) => ({
  value,
  label: value.replaceAll('_', ' '),
}));

export function PmsProvidersPage() {
  const [form, setForm] = useState({
    provider_name: '',
    provider_code: '',
    api_version: '',
    website: '',
    documentation_url: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const providersApi = useApi(() => api.get('/pms/providers'), []);
  const rows = rowsFrom(providersApi.data);

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
      await api.post('/pms/providers', form);

      setForm({
        provider_name: '',
        provider_code: '',
        api_version: '',
        website: '',
        documentation_url: '',
      });

      await providersApi.reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <PageHeader
        title="PMS Providers"
        description="Manage PMS provider master records and prepare capability matrices for standalone, PMS and hybrid execution."
        actionLabel="Refresh"
        onAction={providersApi.reload}
      />

      <form onSubmit={submit} className="console-card grid gap-4 p-5 lg:grid-cols-3">
        <Field label="Provider name" name="provider_name" value={form.provider_name} onChange={update} required placeholder="Cloudbeds" />
        <Field label="Provider code" name="provider_code" value={form.provider_code} onChange={update} options={providers} required />
        <Field label="API version" name="api_version" value={form.api_version} onChange={update} placeholder="v1" />
        <Field label="Website" name="website" value={form.website} onChange={update} placeholder="https://..." />
        <Field label="Docs URL" name="documentation_url" value={form.documentation_url} onChange={update} placeholder="https://..." />

        <div className="flex items-end">
          <button className="btn-console-primary w-full" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Provider'}
          </button>
        </div>

        {formError ? (
          <p className="rounded-xl border border-enstays-urgentLine bg-enstays-urgentBg px-3 py-2 text-xs text-enstays-urgent lg:col-span-3">
            {formError}
          </p>
        ) : null}
      </form>

      {providersApi.loading ? <LoadingState label="Loading PMS providers..." /> : null}
      {providersApi.error ? <ErrorState error={providersApi.error} onRetry={providersApi.reload} /> : null}

      {!providersApi.loading && !providersApi.error ? (
        <DataTable
          rows={rows}
          empty="No PMS providers found yet."
          columns={[
            {
              key: 'provider_name',
              label: 'Provider',
              render: (row) => (
                <span className="font-semibold text-enstays-text">
                  {row.provider_name || '—'}
                </span>
              ),
            },
            { key: 'provider_code', label: 'Code' },
            { key: 'api_version', label: 'API Version' },
            { key: 'website', label: 'Website' },
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