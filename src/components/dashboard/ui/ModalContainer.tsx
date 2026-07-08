import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle2, AlertTriangle, Info, HelpCircle, X } from 'lucide-react';
import { useDashboard } from '../DashboardContext';

export default function ModalContainer() {
  const { modal, closeModal } = useDashboard();

  if (!modal) return null;

  const icons = {
    delete: <Trash2 className="w-6 h-6 text-red-500" />,
    success: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    info: <Info className="w-6 h-6 text-blue-500" />,
    confirmation: <HelpCircle className="w-6 h-6 text-indigo-500" />,
  };

  const colors = {
    delete: {
      bg: 'bg-red-50 dark:bg-red-950/20',
      border: 'border-red-200 dark:border-red-900/30',
      btn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-900/30',
      btn: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-900/30',
      btn: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-900/30',
      btn: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
    confirmation: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/20',
      border: 'border-indigo-200 dark:border-indigo-900/30',
      btn: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    },
  };

  const scheme = colors[modal.type as keyof typeof colors] || colors.info;
  const icon = icons[modal.type as keyof typeof icons] || icons.info;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden z-10"
        >
          {/* Header Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6">
            <div className="flex gap-4">
              {/* Icon Container */}
              <div className={`p-3 rounded-xl border flex-shrink-0 ${scheme.bg} ${scheme.border}`}>
                {icon}
              </div>

              {/* Text Context */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 leading-tight">
                  {modal.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {modal.message}
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (modal.onConfirm) modal.onConfirm();
                  closeModal();
                }}
                className={`px-4 py-2 text-sm font-semibold text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${scheme.btn}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
