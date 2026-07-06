import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../config/api';
import { api } from '../services/httpClient';

const AuthContext = createContext(null);

function extractToken(data) {
  return (
    data?.accessToken ||
    data?.access_token ||
    data?.token ||
    data?.access?.token ||
    data?.tokens?.accessToken ||
    data?.tokens?.access_token ||
    null
  );
}

function extractUser(data) {
  return data?.user || data?.platform_user || data?.identity || data?.account || data || null;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [booting, setBooting] = useState(Boolean(token));

  const saveSession = (nextToken, nextUser) => {
    if (nextToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
      setToken(nextToken);
    }

    if (nextUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    }
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const login = async ({ email, password }) => {
    const data = await api.post('/auth/platform/login', { email, password });
    const nextToken = extractToken(data);
    const nextUser = extractUser(data);

    if (!nextToken) {
      throw new Error('Login succeeded but no access token was returned. Check backend response shape.');
    }

    saveSession(nextToken, nextUser);
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/platform/logout', {});
    } catch {
      // Clear local session even if backend logout fails.
    }

    clearSession();
  };

  const refreshMe = async () => {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) return null;

    const data = await api.get('/me');
    const nextUser = extractUser(data);

    if (nextUser) {
      saveSession(null, nextUser);
    }

    return nextUser;
  };

  useEffect(() => {
    let mounted = true;

    async function boot() {
      if (!token) {
        setBooting(false);
        return;
      }

      try {
        await refreshMe();
      } catch {
        if (mounted) clearSession();
      } finally {
        if (mounted) setBooting(false);
      }
    }

    boot();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      booting,
      isAuthenticated: Boolean(token),
      login,
      logout,
      refreshMe,
    }),
    [token, user, booting],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}