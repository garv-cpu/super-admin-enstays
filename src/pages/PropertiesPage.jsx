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

const propertyTypes = [
  'HOTEL',
  'RESORT',
  'VILLA',
  'APARTMENT',
  'SERVICE_APARTMENT',
  'HOSTEL',
  'HOMESTAY',
].map((value) => ({
  value,
  label: value.replaceAll('_', ' '),
}));

export function PropertiesPage() {
  const [form, setForm] = useState({
    hotel_group_id: '',
    hotel_brand_id: '',
    property_name: '',
    property_code: '',
    property_type: 'HOTEL',
    city: '',
    country: '',
    timezone: '',
    currency: 'INR',
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const groupsApi = useApi(() => api.get('/hotel-groups'), []);
  const brandsApi = useApi(() => api.get('/hotel-brands'), []);
  const propertiesApi = useApi(() => api.get('/properties'), []);

  const groups = rowsFrom(groupsApi.data);
  const brands = rowsFrom(brandsApi.data);
  const properties = rowsFrom(propertiesApi.data);

  const allowedBrands = form.hotel_group_id
    ? brands.filter((brand) => String(brand.hotel_group_id) === String(form.hotel_group_id))
    : brands;

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
      const payload = {
        ...form,
        hotel_brand_id: form.hotel_brand_id || null,
      };

      if (form.hotel_brand_id) {
        await api.post(`/hotel-brands/${form.hotel_brand_id}/properties`, payload);
      } else {
        await api.post(`/hotel-groups/${form.hotel_group_id}/properties`, payload);
      }

      setForm({
        hotel_group_id: '',
        hotel_brand_id: '',
        property_name: '',
        property_code: '',
        property_type: 'HOTEL',
        city: '',
        country: '',
        timezone: '',
        currency: 'INR',
      });

      await propertiesApi.reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <PageHeader
        title="Properties"
        description="Create and manage properties under hotel groups, with optional brand assignment and safe group-brand validation."
        actionLabel="Refresh"
        onAction={propertiesApi.reload}
      />

      <form onSubmit={submit} className="console-card grid gap-4 p-5 lg:grid-cols-4">
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

        <Field
          label="Hotel brand optional"
          name="hotel_brand_id"
          value={form.hotel_brand_id}
          onChange={update}
          options={allowedBrands.map((brand) => ({
            value: brand.id,
            label: brand.brand_name || brand.brand_code || `Brand #${brand.id}`,
          }))}
        />

        <Field label="Property name" name="property_name" value={form.property_name} onChange={update} required placeholder="Taj Goa" />
        <Field label="Property code" name="property_code" value={form.property_code} onChange={update} required placeholder="TAJ-GOA" />
        <Field label="Property type" name="property_type" value={form.property_type} onChange={update} options={propertyTypes} required />
        <Field label="City" name="city" value={form.city} onChange={update} placeholder="Goa" />
        <Field label="Country" name="country" value={form.country} onChange={update} placeholder="India" />
        <Field label="Currency" name="currency" value={form.currency} onChange={update} placeholder="INR" />

        <div className="lg:col-span-4">
          {formError ? (
            <p className="mb-3 rounded-xl border border-enstays-urgentLine bg-enstays-urgentBg px-3 py-2 text-xs text-enstays-urgent">
              {formError}
            </p>
          ) : null}

          <button className="btn-console-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Property'}
          </button>
        </div>
      </form>

      {propertiesApi.loading ? <LoadingState label="Loading properties..." /> : null}
      {propertiesApi.error ? <ErrorState error={propertiesApi.error} onRetry={propertiesApi.reload} /> : null}

      {!propertiesApi.loading && !propertiesApi.error ? (
        <DataTable
          rows={properties}
          empty="No properties found yet."
          columns={[
            {
              key: 'property_name',
              label: 'Property',
              render: (row) => (
                <span className="font-semibold text-enstays-text">
                  {row.property_name || '—'}
                </span>
              ),
            },
            { key: 'property_code', label: 'Code' },
            { key: 'hotel_group_id', label: 'Group ID' },
            { key: 'hotel_brand_id', label: 'Brand ID' },
            { key: 'city', label: 'City' },
            {
              key: 'pms_enabled',
              label: 'PMS',
              render: (row) => (row.pms_enabled ? 'Enabled' : 'Disabled'),
            },
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