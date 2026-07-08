import { useDashboard } from '../DashboardContext';
import { Compass, AlertTriangle, ArrowLeft } from 'lucide-react';

export const Error404 = () => {
  const { setPage, setSubPage } = useDashboard();

  return (
    <div className="min-h-screen bg-brandBg-light dark:bg-brandBg-darker text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center transition-colors">
      <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-8 animate-pulse">
        <Compass className="w-12 h-12" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight mb-2">404</h1>
      <h2 className="text-lg font-bold text-slate-500 mb-6">Page Not Found</h2>
      
      <p className="text-sm text-slate-400 max-w-sm mb-8 leading-relaxed">
        The system page you are searching for does not exist or has been relocated to another workspace node.
      </p>

      <button
        onClick={() => {
          setPage('dashboard');
          setSubPage('home');
        }}
        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
};

export const Error500 = ({ onRetry }: { onRetry?: () => void }) => {
  const { setPage, setSubPage } = useDashboard();

  return (
    <div className="min-h-screen bg-brandBg-light dark:bg-brandBg-darker text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center transition-colors">
      <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mb-8">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight mb-2">500</h1>
      <h2 className="text-lg font-bold text-slate-500 mb-6">Internal Server Error</h2>

      <p className="text-sm text-slate-400 max-w-sm mb-8 leading-relaxed">
        The remote server has encountered an unexpected database deadlock. Please retry the transaction handshake.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => {
            if (onRetry) {
              onRetry();
            } else {
              setPage('dashboard');
              setSubPage('home');
            }
          }}
          className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md"
        >
          Retry Connection
        </button>
        <button
          onClick={() => {
            setPage('dashboard');
            setSubPage('home');
          }}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
