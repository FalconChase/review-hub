import { useAuth } from '../../context/AuthContext';
import { subjects, topics, userProgress } from '../../data/mockData';

const DAYS_TO_SHOW = 30;

export default function Progress() {
  const { currentUser } = useAuth();
  const activeIds = currentUser?.activeProducts || [];
  const activeSubjects = subjects.filter(s => activeIds.includes(s.id));

  // Build last-30-days calendar
  const today = new Date();
  const activityDates = new Set((userProgress.recentActivity || []).map(a => a.date));
  const calDays = Array.from({ length: DAYS_TO_SHOW }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (DAYS_TO_SHOW - 1 - i));
    const key = d.toISOString().split('T')[0];
    return { key, active: activityDates.has(key), day: d.getDate() };
  });

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Per-product progress */}
      <div>
        <h2 className="font-bold text-base mb-4" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Subject Progress</h2>
        <div className="space-y-3">
          {activeSubjects.map(s => {
            const prog = userProgress.subjectProgress?.[s.id];
            const pct = prog?.progress ?? 0;
            const subjectTopics = topics.filter(t => t.subjectId === s.id);
            const completed = subjectTopics.filter(t => t.status === 'done').length;

            return (
              <div key={s.id} className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: s.iconBg || 'var(--brand-soft)' }}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>{s.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
                        {completed} of {subjectTopics.length} topics done
                        {prog?.bestScore ? ` · Best: ${prog.bestScore}%` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: 'var(--brand)', fontFamily: "'Lora', serif" }}>{pct}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: 'var(--brand)' }} />
                </div>

                {/* Topic pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {subjectTopics.map(t => (
                    <span
                      key={t.id}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: t.status === 'done' ? '#f0fdf4' : t.status === 'current' ? 'var(--brand-soft)' : 'var(--surface2)',
                        color: t.status === 'done' ? '#16a34a' : t.status === 'current' ? 'var(--brand)' : 'var(--text3)',
                      }}
                    >
                      {t.status === 'done' ? '✓ ' : t.status === 'current' ? '▶ ' : ''}{t.title}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {activeSubjects.length === 0 && (
            <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-3xl mb-2">📈</p>
              <p className="text-sm" style={{ color: 'var(--text3)' }}>No active products yet. Ask your admin for access.</p>
            </div>
          )}
        </div>
      </div>

      {/* Streak calendar */}
      <div className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <h2 className="font-bold text-base mb-4" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Study Calendar (Last 30 Days)</h2>
        <div className="flex flex-wrap gap-1.5">
          {calDays.map(d => (
            <div
              key={d.key}
              title={d.key}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors"
              style={{
                background: d.active ? 'var(--brand)' : 'var(--surface2)',
                color: d.active ? '#fff' : 'var(--text3)',
              }}
            >
              {d.day}
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--text3)' }}>
          <span className="inline-block w-3 h-3 rounded mr-1 align-middle" style={{ background: 'var(--brand)' }} />
          Days with study activity
        </p>
      </div>
    </div>
  );
}
