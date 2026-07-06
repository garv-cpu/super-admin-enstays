export function PageHeader({ eyebrow = 'Super Admin', title, description, actionLabel }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-enstays-gold">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-enstays-green md:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-3xl text-base text-enstays-slate">{description}</p> : null}
      </div>
      {actionLabel ? (
        <button className="rounded-2xl bg-enstays-green px-5 py-3 text-sm font-semibold text-black shadow-soft transition hover:opacity-95">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
