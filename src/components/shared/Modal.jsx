import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, subtitle, children, actions }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl flex flex-col"
        style={{ background: 'var(--surface)', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>{title}</h2>
            {subtitle && <p className="text-sm mt-0.5" style={{ color: 'var(--text2)' }}>{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--text3)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-4 overflow-y-auto flex-1">{children}</div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
