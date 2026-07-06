export function ErrorState({ error, onRetry }) {
  return (
    <div className="console-card border-enstays-urgentLine bg-enstays-urgentBg p-5">
      <p className="text-sm font-semibold text-enstays-urgent">Could not load this section</p>
      <p className="mt-2 text-xs leading-5 text-enstays-text2">
        {error?.message || 'Unknown error'}
      </p>

      {onRetry ? (
        <button className="btn-console-ghost mt-4" onClick={onRetry} type="button">
          Retry
        </button>
      ) : null}
    </div>
  );
}