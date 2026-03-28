import { PlusCircle, UserPlus, Key, BarChart2 } from 'lucide-react';

export default function QuickActions({ onNewProduct, onAddUser, onGrantAccess, onViewReports }) {
  const actions = [
    { icon: PlusCircle, label: 'New Product', color: '#4f87d4', bg: '#eff6ff', onClick: onNewProduct },
    { icon: UserPlus,   label: 'Add User',    color: '#22c55e', bg: '#f0fdf4', onClick: onAddUser },
    { icon: Key,        label: 'Grant Access',color: '#f59e0b', bg: '#fefce8', onClick: onGrantAccess },
    { icon: BarChart2,  label: 'View Reports',color: '#14b8a6', bg: '#f0fdfa', onClick: onViewReports },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(({ icon: Icon, label, color, bg, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: bg, border: `1px solid ${color}22` }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + '22' }}>
            <Icon size={20} style={{ color }} />
          </div>
          <span className="text-sm font-semibold" style={{ color }}>{label}</span>
        </button>
      ))}
    </div>
  );
}
