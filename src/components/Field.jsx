export function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-enstays-text2">{label}</span>

      {options ? (
        <select
          name={name}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          className="w-full rounded-xl border border-enstays-line bg-enstays-bg2 px-3 py-3 text-sm text-enstays-text outline-none transition focus:border-enstays-goldLine"
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-xl border border-enstays-line bg-enstays-bg2 px-3 py-3 text-sm text-enstays-text outline-none transition placeholder:text-enstays-text3 focus:border-enstays-goldLine"
        />
      )}
    </label>
  );
}