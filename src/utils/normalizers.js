export function rowsFrom(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.rows)) return data.rows;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

export function countFrom(data, fallbackRows = []) {
  return data?.total || data?.total_count || data?.pagination?.total || fallbackRows.length || 0;
}

export function firstValue(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '') ?? '—';
}