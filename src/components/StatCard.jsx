export function StatCard({ title, value, helper, icon: Icon, tone = 'gold' }) {
  const toneClasses = {
    gold: 'border-enstays-goldLine bg-enstays-goldSoft text-enstays-gold',
    blue: 'border-enstays-newLine bg-enstays-newBg text-enstays-new',
    green: 'border-enstays-doneLine bg-enstays-doneBg text-enstays-done',
    urgent: 'border-enstays-urgentLine bg-enstays-urgentBg text-enstays-urgent',
  };

  return (
    <article className="console-card p-[18px] transition hover:-translate-y-0.5 hover:border-enstays-goldLine hover:bg-enstays-surface2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium text-enstays-text2">{title}</p>
          <h3 className="mt-4 text-[38px] font-medium leading-none text-enstays-text">{value}</h3>
          <p className="mt-2 text-[12px] leading-5 text-enstays-text2">{helper}</p>
        </div>
        {Icon ? (
          <div className={`flex h-[42px] w-[42px] items-center justify-center rounded-xl border ${toneClasses[tone] || toneClasses.gold}`}>
            <Icon size={21} />
          </div>
        ) : null}
      </div>
    </article>
  );
}