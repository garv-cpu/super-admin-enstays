const toneByStatus = {
  ACTIVE: 'border-enstays-doneLine bg-enstays-doneBg text-enstays-done',
  CONNECTED: 'border-enstays-doneLine bg-enstays-doneBg text-enstays-done',
  SUCCESS: 'border-enstays-doneLine bg-enstays-doneBg text-enstays-done',
  ENABLED: 'border-enstays-doneLine bg-enstays-doneBg text-enstays-done',

  PENDING: 'border-enstays-progressLine bg-enstays-progressBg text-enstays-progress',
  RETRYING: 'border-enstays-progressLine bg-enstays-progressBg text-enstays-progress',

  INACTIVE: 'border-enstays-line bg-enstays-surface text-enstays-text2',
  DISABLED: 'border-enstays-line bg-enstays-surface text-enstays-text2',

  FAILED: 'border-enstays-urgentLine bg-enstays-urgentBg text-enstays-urgent',
  SUSPENDED: 'border-enstays-urgentLine bg-enstays-urgentBg text-enstays-urgent',
};

export function StatusBadge({ value }) {
  const status = value || 'UNKNOWN';
  const classes =
    toneByStatus[status] || 'border-enstays-goldLine bg-enstays-goldSoft text-enstays-gold';

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold ${classes}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}