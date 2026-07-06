import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="console-shell grid min-h-screen place-items-center px-5 py-10 text-enstays-text">
      <div className="w-full max-w-[460px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#E0B255,#D4A94E_50%,#9A6F1E)] text-enstays-bg2 shadow-gold">
            <span className="font-serif text-4xl font-bold leading-none">E</span>
          </div>

          <h1 className="font-serif text-4xl font-semibold">Enstays Console</h1>
          <p className="mt-2 text-sm text-enstays-text2">Super Admin login</p>
        </div>

        <form onSubmit={submit} className="console-card space-y-5 p-6">
          <div>
            <label className="mb-2 block text-xs font-semibold text-enstays-text2">
              Email
            </label>
            <input
              className="input-console"
              name="email"
              value={form.email}
              onChange={update}
              type="email"
              placeholder="admin@enstays.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-enstays-text2">
              Password
            </label>
            <input
              className="input-console"
              name="password"
              value={form.password}
              onChange={update}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {error ? (
            <p className="rounded-xl border border-enstays-urgentLine bg-enstays-urgentBg px-3 py-2 text-xs text-enstays-urgent">
              {error}
            </p>
          ) : null}

          <button className="btn-console-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-center font-mono text-[10px] text-enstays-text3">
            API: {API_BASE_URL}
          </p>
        </form>
      </div>
    </div>
  );
}