export function LoadingState({ label = 'Loading data...' }) {
  return (
    <div className="console-card p-8 text-center text-sm text-enstays-text2">
      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-enstays-line border-t-enstays-gold" />
      {label}
    </div>
  );
}