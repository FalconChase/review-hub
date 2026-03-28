import StatCard from '../../components/shared/StatCard';
import Badge from '../../components/shared/Badge';
import { subjects, scores, users } from '../../data/mockData';

const perProduct = subjects.map(s => {
  const productScores = scores.filter(sc => sc.subjectId === s.id);
  const avg = productScores.length
    ? Math.round(productScores.reduce((a, b) => a + b.score, 0) / productScores.length)
    : 0;
  const passRate = productScores.length
    ? Math.round((productScores.filter(sc => sc.passed).length / productScores.length) * 100)
    : 0;
  return { ...s, avgScore: avg, passRate, attempts: productScores.length };
});

export default function Analytics() {
  const totalAttempts = scores.length;
  const avgScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length)
    : 0;
  const passRate = scores.length
    ? Math.round((scores.filter(s => s.passed).length / scores.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="📝" label="Total Attempts" value={totalAttempts} iconBg="#eff6ff" />
        <StatCard icon="⭐" label="Avg. Score" value={`${avgScore}%`} iconBg="#fefce8" />
        <StatCard icon="✅" label="Pass Rate" value={`${passRate}%`} iconBg="#f0fdf4" />
        <StatCard icon="👥" label="Active This Week" value={users.filter(u => u.status === 'active').length} iconBg="#fdf4ff" />
      </div>

      {/* Score distribution */}
      <div className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <h3 className="font-bold text-base mb-4" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Score Distribution</h3>
        <div className="space-y-3">
          {[
            { range: '90–100%', count: scores.filter(s => s.score >= 90).length, color: '#16a34a' },
            { range: '75–89%',  count: scores.filter(s => s.score >= 75 && s.score < 90).length, color: '#4f87d4' },
            { range: '60–74%',  count: scores.filter(s => s.score >= 60 && s.score < 75).length, color: '#f59e0b' },
            { range: 'Below 60%', count: scores.filter(s => s.score < 60).length, color: '#ef4444' },
          ].map(row => (
            <div key={row.range} className="flex items-center gap-4">
              <span className="w-20 text-xs font-medium text-right flex-shrink-0" style={{ color: 'var(--text2)' }}>{row.range}</span>
              <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ background: 'var(--surface2)' }}>
                <div
                  className="h-full rounded-lg flex items-center px-2 transition-all duration-700"
                  style={{ width: `${scores.length ? (row.count / scores.length) * 100 : 0}%`, background: row.color, minWidth: row.count > 0 ? '2rem' : 0 }}
                >
                  {row.count > 0 && <span className="text-xs text-white font-bold">{row.count}</span>}
                </div>
              </div>
              <span className="w-6 text-xs" style={{ color: 'var(--text3)' }}>{row.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-product breakdown */}
      <div>
        <h3 className="font-bold text-base mb-3" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Per-Product Breakdown</h3>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
                {['Product', 'Attempts', 'Avg. Score', 'Pass Rate', 'Users'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {perProduct.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ background: 'var(--surface)', borderBottom: i < perProduct.length - 1 ? '1px solid var(--border)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.icon}</span>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>{p.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{p.attempts}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
                        <div className="h-full rounded-full" style={{ width: `${p.avgScore}%`, background: 'var(--brand)' }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{p.avgScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={p.passRate >= 75 ? 'success' : 'warning'}>{p.passRate}%</Badge>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{p.userCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
