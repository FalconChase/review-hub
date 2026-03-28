import { Flame } from 'lucide-react';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function StreakTracker({ streak = 0, recentActivity = [] }) {
  // Build last-7-days activity set
  const activityDates = new Set(recentActivity.map(a => a.date));
  const today = new Date();

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const key = d.toISOString().split('T')[0];
    return { day: DAYS[d.getDay()], active: activityDates.has(key) };
  });

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-sm" style={{ color: 'var(--text)' }}>Study Streak</h3>
          <p className="text-xs" style={{ color: 'var(--text3)' }}>Keep it going!</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'var(--brand-soft)' }}>
          <Flame size={16} style={{ color: 'var(--brand)' }} />
          <span className="font-bold text-sm" style={{ color: 'var(--brand)' }}>{streak} days</span>
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        {last7.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{
                background: d.active ? 'var(--brand)' : 'var(--surface2)',
              }}
            >
              {d.active && <Flame size={14} className="text-white" />}
            </div>
            <span className="text-xs font-medium" style={{ color: d.active ? 'var(--brand)' : 'var(--text3)' }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
