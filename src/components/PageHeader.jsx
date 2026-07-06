export function PageHeader({ eyebrow = 'Super Admin', title, description, actionLabel }) {
  return (
    <div className="console-card flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-enstays-gold">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-[32px] font-semibold leading-none tracking-[0.01em] text-enstays-text md:text-[38px]">{title}</h1>
        {description ? <p className="mt-3 max-w-3xl text-[13px] leading-6 text-enstays-text2">{description}</p> : null}
      </div>
      {actionLabel ? <button className="btn-console-primary">{actionLabel}</button> : null}
    </div>
  );
}