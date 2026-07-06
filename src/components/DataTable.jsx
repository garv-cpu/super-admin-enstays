export function DataTable({ columns, rows, empty = 'No records found', getRowKey }) {
  const safeRows = Array.isArray(rows) ? rows : [];

  return (
    <div className="console-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-enstays-line bg-enstays-bg2 text-[10.5px] uppercase tracking-[0.07em] text-enstays-text3">
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-bold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {safeRows.length ? (
              safeRows.map((row, index) => (
                <tr
                  key={getRowKey ? getRowKey(row, index) : row.id || row.uuid || index}
                  className="border-b border-enstays-line last:border-b-0 hover:bg-enstays-surface2"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4 align-top text-enstays-text2">
                      {column.render ? column.render(row, index) : row[column.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-10 text-center text-enstays-text3" colSpan={columns.length}>
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}