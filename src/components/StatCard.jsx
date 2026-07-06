export function StatCard({ title, value, helper, icon: Icon }) {
  return (
    <article className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-enstays-slate">{title}</p>
          <h3 className="mt-3 text-3xl font-semibold text-enstays-green">{value}</h3>
          <p className="mt-2 text-sm text-enstays-slate">{helper}</p>
        </div>
        {Icon ? (
          <div className="rounded-2xl bg-enstays-ivory p-3 text-enstays-green">
            <Icon size={22} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
