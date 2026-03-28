import Badge from '../shared/Badge';

export default function ScoreHistory({ scores, limit }) {
  const displayed = limit ? scores.slice(0, limit) : scores;

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
            {['Subject', 'Topic', 'Score', 'Result', 'Date'].map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayed.map((s, i) => (
            <tr
              key={s.id}
              style={{
                background: 'var(--surface)',
                borderBottom: i < displayed.length - 1 ? '1px solid var(--border)' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
            >
              <td className="px-4 py-3 font-medium" style={{ color: 'var(--text)' }}>{s.subjectTitle}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{s.topicTitle}</td>
              <td className="px-4 py-3">
                <span className="font-bold text-base" style={{ color: s.passed ? '#16a34a' : '#dc2626' }}>{s.score}</span>
                <span className="text-xs" style={{ color: 'var(--text3)' }}>/{s.total}</span>
              </td>
              <td className="px-4 py-3">
                <Badge variant={s.passed ? 'success' : 'danger'}>{s.passed ? 'Passed' : 'Review'}</Badge>
              </td>
              <td className="px-4 py-3 text-xs" style={{ color: 'var(--text3)' }}>{s.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
