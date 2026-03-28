export default function StatCard({ icon, label, value, change, changeLabel, iconBg }) {
  const isPositive = change >= 0;
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: iconBg || 'var(--brand-soft)' }}
        >
          {icon}
        </div>
        {change !== undefined && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>{value}</div>
        <div className="text-sm mt-0.5" style={{ color: 'var(--text2)' }}>{label}</div>
        {changeLabel && <div className="text-xs mt-1" style={{ color: 'var(--text3)' }}>{changeLabel}</div>}
      </div>
    </div>
  );
}
