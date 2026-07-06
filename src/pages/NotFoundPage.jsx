import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-enstays-gold">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-enstays-green">Page not found</h1>
        <Link className="mt-6 inline-flex rounded-2xl bg-enstays-green px-5 py-3 text-sm font-semibold text-black" to="/">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
