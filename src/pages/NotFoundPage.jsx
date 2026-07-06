import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div className="console-panel p-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-enstays-gold">404</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-enstays-text">Page not found</h1>
        <Link className="btn-console-primary mt-6" to="/">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}