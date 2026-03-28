import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ScoreHistory from '../../components/user/ScoreHistory';
import { scores } from '../../data/mockData';

const FILTERS = ['All', 'Passed', 'Review'];

export default function MyScores() {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState('All');

  const userScores = scores.filter(s => s.userId === currentUser?.uid);
  const filtered = userScores.filter(s => {
    if (filter === 'Passed') return s.passed;
    if (filter === 'Review') return !s.passed;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            style={{
              background: filter === f ? 'var(--brand)' : 'var(--surface)',
              color: filter === f ? '#fff' : 'var(--text2)',
              border: '1px solid var(--border)',
            }}
          >{f}</button>
        ))}
        <span className="ml-auto text-sm" style={{ color: 'var(--text3)' }}>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-3xl mb-3">📊</p>
          <p className="font-semibold" style={{ color: 'var(--text)' }}>No scores yet</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text3)' }}>Complete a quiz to see your scores here.</p>
        </div>
      ) : (
        <ScoreHistory scores={filtered} />
      )}
    </div>
  );
}
