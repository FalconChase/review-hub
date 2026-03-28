export default function ActivityLog({ activities }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Recent Activity</h3>
      </div>
      <div className="px-4 py-2" style={{ background: 'var(--surface)' }}>
        {activities.map((a, i) => (
          <div key={a.id} className={`flex gap-3 py-3 ${i < activities.length - 1 ? 'border-b' : ''}`} style={{ borderColor: 'var(--border)' }}>
            <div className="mt-1.5 flex-shrink-0">
              <div className="w-2 h-2 rounded-full" style={{ background: a.dotColor }} />
            </div>
            <div className="flex-1">
              <p className="text-sm" style={{ color: 'var(--text)' }}>{a.message}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
