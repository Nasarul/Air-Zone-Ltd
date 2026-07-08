import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useDashboard } from '../DashboardContext';
import { ToastMessage } from '../../../types/dashboard';

export default function ToastContainer() {
  const { toasts, dismissToast } = useDashboard();

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 md:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

const ToastCard = ({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000); // Auto dismiss after 5s
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-white/80 dark:bg-slate-900/90 border-emerald-500/20 dark:border-emerald-500/10 shadow-emerald-500/5',
    error: 'bg-white/80 dark:bg-slate-900/90 border-red-500/20 dark:border-red-500/10 shadow-red-500/5',
    warning: 'bg-white/80 dark:bg-slate-900/90 border-amber-500/20 dark:border-amber-500/10 shadow-amber-500/5',
    info: 'bg-white/80 dark:bg-slate-900/90 border-blue-500/20 dark:border-blue-500/10 shadow-blue-500/5',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg ${bgStyles[toast.type]} relative overflow-hidden`}
    >
      {/* Visual Accent Bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          toast.type === 'success'
            ? 'bg-emerald-500'
            : toast.type === 'error'
            ? 'bg-red-500'
            : toast.type === 'warning'
            ? 'bg-amber-500'
            : 'bg-blue-500'
        }`}
      />

      <div className="pl-1">{icons[toast.type]}</div>
      <div className="flex-1 flex flex-col gap-0.5 select-none">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{toast.title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
