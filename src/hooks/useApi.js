import { useCallback, useEffect, useMemo, useState } from 'react';

export function useApi(loader, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await loader();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return useMemo(
    () => ({
      data,
      loading,
      error,
      reload: load,
      setData,
    }),
    [data, loading, error, load],
  );
}