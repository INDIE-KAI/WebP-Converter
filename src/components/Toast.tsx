import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 transition-all transform animate-in slide-in-from-top-2 duration-200 ${
        toast.type === 'success'
          ? 'bg-zinc-900 text-white border-zinc-800'
          : toast.type === 'error'
          ? 'bg-red-900 text-white border-red-800'
          : 'bg-zinc-800 text-white border-zinc-700'
      }`}
    >
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />}

      <div className="flex-1 min-w-0">
        <h5 className="font-bold text-xs sm:text-sm">{toast.title}</h5>
        {toast.message && <p className="text-xs text-zinc-300 font-normal mt-0.5">{toast.message}</p>}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="text-zinc-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
