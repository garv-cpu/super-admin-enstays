export function EmptyState({ title, description }) {
  return (
    <div className="rounded-3xl border border-dashed border-enstays-green/20 bg-white/70 p-10 text-center">
      <h2 className="text-xl font-semibold text-enstays-green">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-enstays-slate">{description}</p>
    </div>
  );
}
