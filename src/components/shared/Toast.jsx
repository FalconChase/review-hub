import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} className="text-green-600" />,
  error:   <XCircle size={18} className="text-red-600" />,
  warning: <AlertCircle size={18} className="text-amber-600" />,
  info:    <AlertCircle size={18} style={{ color: 'var(--brand)' }} />,
};

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg animate-fade-in"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', minWidth: '260px' }}
    >
      {icons[type]}
      <span className="text-sm font-medium flex-1" style={{ color: 'var(--text)' }}>{message}</span>
      <button onClick={onClose} className="ml-1" style={{ color: 'var(--text3)' }}>
        <X size={16} />
      </button>
    </div>
  );
}
