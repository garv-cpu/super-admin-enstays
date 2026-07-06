export function EmptyState({ title, description }) {
  return (
    <div className="console-card p-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-enstays-goldLine bg-enstays-goldSoft text-enstays-gold">
        <span className="text-lg">•</span>
      </div>
      <h2 className="font-serif text-2xl font-semibold text-enstays-text">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-enstays-text2">{description}</p>
    </div>
  );
}