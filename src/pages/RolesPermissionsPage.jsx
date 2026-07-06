import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { DataTable } from '../components/DataTable';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Field } from '../components/Field';
import { api } from '../services/httpClient';
import { useApi } from '../hooks/useApi';
import { rowsFrom } from '../utils/normalizers';

export function RolesPermissionsPage() {
  const [templateForm, setTemplateForm] = useState({
    template_name: '',
    template_code: '',
    template_type: 'NOTIFICATION',
  });

  const [subscriptionForm, setSubscriptionForm] = useState({
    hotel_group_id: '',
    plan_name: '',
    status: 'ACTIVE',
  });

  const [message, setMessage] = useState('');

  const settingsApi = useApi(() => api.get('/platform/settings'), []);
  const templatesApi = useApi(() => api.get('/global-templates'), []);
  const subscriptionsApi = useApi(() => api.get('/subscriptions'), []);

  const templates = rowsFrom(templatesApi.data);
  const subscriptions = rowsFrom(subscriptionsApi.data);

  const updateTemplate = (event) => {
    setTemplateForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const updateSubscription = (event) => {
    setSubscriptionForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const saveTemplate = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await api.post('/global-templates', templateForm);

      setTemplateForm({
        template_name: '',
        template_code: '',
        template_type: 'NOTIFICATION',
      });

      await templatesApi.reload();
      setMessage('Template placeholder saved.');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const saveSubscription = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await api.post('/subscriptions', subscriptionForm);

      setSubscriptionForm({
        hotel_group_id: '',
        plan_name: '',
        status: 'ACTIVE',
      });

      await subscriptionsApi.reload();
      setMessage('Subscription placeholder saved.');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="space-y-8">
      <PageHeader
        title="Settings"
        description="Super Admin settings, subscriptions and global templates connected to placeholder APIs for MVP safety."
        actionLabel="Refresh"
        onAction={() => {
          settingsApi.reload();
          templatesApi.reload();
          subscriptionsApi.reload();
        }}
      />

      {message ? (
        <div className="console-card border-enstays-goldLine bg-enstays-goldSoft p-4 text-sm text-enstays-gold">
          {message}
        </div>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-2">
        <form onSubmit={saveTemplate} className="console-card space-y-4 p-5">
          <h2 className="font-serif text-2xl font-semibold text-enstays-text">
            Global Templates
          </h2>

          <Field label="Template name" name="template_name" value={templateForm.template_name} onChange={updateTemplate} required />
          <Field label="Template code" name="template_code" value={templateForm.template_code} onChange={updateTemplate} required />
          <Field
            label="Template type"
            name="template_type"
            value={templateForm.template_type}
            onChange={updateTemplate}
            options={[
              { value: 'NOTIFICATION', label: 'Notification' },
              { value: 'EMAIL', label: 'Email' },
              { value: 'SMS', label: 'SMS' },
            ]}
          />

          <button className="btn-console-primary">Create Template</button>
        </form>

        <form onSubmit={saveSubscription} className="console-card space-y-4 p-5">
          <h2 className="font-serif text-2xl font-semibold text-enstays-text">
            Subscriptions
          </h2>

          <Field label="Hotel group ID" name="hotel_group_id" value={subscriptionForm.hotel_group_id} onChange={updateSubscription} required />
          <Field label="Plan name" name="plan_name" value={subscriptionForm.plan_name} onChange={updateSubscription} required />
          <Field
            label="Status"
            name="status"
            value={subscriptionForm.status}
            onChange={updateSubscription}
            options={[
              { value: 'ACTIVE', label: 'Active' },
              { value: 'INACTIVE', label: 'Inactive' },
            ]}
          />

          <button className="btn-console-primary">Create Subscription</button>
        </form>
      </div>

      {settingsApi.loading || templatesApi.loading || subscriptionsApi.loading ? (
        <LoadingState label="Loading settings..." />
      ) : null}

      {settingsApi.error ? <ErrorState error={settingsApi.error} onRetry={settingsApi.reload} /> : null}

      <DataTable
        rows={templates}
        empty="No global templates returned yet."
        columns={[
          { key: 'template_name', label: 'Template' },
          { key: 'template_code', label: 'Code' },
          { key: 'template_type', label: 'Type' },
          { key: 'status', label: 'Status' },
        ]}
      />

      <DataTable
        rows={subscriptions}
        empty="No subscriptions returned yet."
        columns={[
          { key: 'hotel_group_id', label: 'Group ID' },
          { key: 'plan_name', label: 'Plan' },
          { key: 'status', label: 'Status' },
          { key: 'created_at', label: 'Created' },
        ]}
      />
    </section>
  );
}