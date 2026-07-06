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

const brandTypes = [
  'LUXURY',
  'PREMIUM',
  'MID_SCALE',
  'ECONOMY',
  'BOUTIQUE',
  'RESORT',
  'OTHER',
].map((value) => ({
  value,
  label: value.replaceAll('_', ' '),
}));

export function BrandsPage() {
  const [form, setForm] = useState({
    hotel_group_id: '',
    brand_name: '',
    brand_code: '',
    brand_type: '',
    website: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const groupsApi = useApi(() => api.get('/hotel-groups'), []);
  const brandsApi = useApi(() => api.get('/hotel-brands'), []);

  const groups = rowsFrom(groupsApi.data);
  const brands = rowsFrom(brandsApi.data);

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
      await api.post(`/hotel-groups/${form.hotel_group_id}/brands`, {
        brand_name: form.brand_name,
        brand_code: form.brand_code,
        brand_type: form.brand_type || undefined,
        website: form.website || undefined,
      });

      setForm({
        hotel_group_id: '',
        brand_name: '',
        brand_code: '',
        brand_type: '',
        website: '',
      });

      await brandsApi.reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <PageHeader
        title="Hotel Brands"
        description="Optional brand layer under a hotel group. Brand and property group must match."
        actionLabel="Refresh"
        onAction={brandsApi.reload}
      />

      <form onSubmit={submit} className="console-card grid gap-4 p-5 lg:grid-cols-3">
        <Field
          label="Hotel group"
          name="hotel_group_id"
          value={form.hotel_group_id}
          onChange={update}
          required
          options={groups.map((group) => ({
            value: group.id,
            label: group.group_name || group.group_code || `Group #${group.id}`,
          }))}
        />

        <Field label="Brand name" name="brand_name" value={form.brand_name} onChange={update} required placeholder="Taj Palace" />
        <Field label="Brand code" name="brand_code" value={form.brand_code} onChange={update} placeholder="TAJ-PALACE" />
        <Field label="Brand type" name="brand_type" value={form.brand_type} onChange={update} options={brandTypes} />
        <Field label="Website" name="website" value={form.website} onChange={update} placeholder="https://..." />

        <div className="flex items-end">
          <button className="btn-console-primary w-full" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Brand'}
          </button>
        </div>

        {formError ? (
          <p className="rounded-xl border border-enstays-urgentLine bg-enstays-urgentBg px-3 py-2 text-xs text-enstays-urgent lg:col-span-3">
            {formError}
          </p>
        ) : null}
      </form>

      {brandsApi.loading ? <LoadingState label="Loading brands..." /> : null}
      {brandsApi.error ? <ErrorState error={brandsApi.error} onRetry={brandsApi.reload} /> : null}

      {!brandsApi.loading && !brandsApi.error ? (
        <DataTable
          rows={brands}
          empty="No brands found yet."
          columns={[
            {
              key: 'brand_name',
              label: 'Brand',
              render: (row) => (
                <span className="font-semibold text-enstays-text">
                  {row.brand_name || '—'}
                </span>
              ),
            },
            { key: 'brand_code', label: 'Code' },
            { key: 'hotel_group_id', label: 'Group ID' },
            { key: 'brand_type', label: 'Type' },
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