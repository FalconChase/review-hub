import { PlayCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UpNext({ topics = [], subjectMap = {} }) {
  const navigate = useNavigate();
  const upNext = topics.filter(t => t.status === 'current' || t.status === 'pending').slice(0, 3);

  if (!upNext.length) return null;

  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>Up Next</h3>
      <div className="space-y-2">
        {upNext.map(t => (
          <div
            key={t.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
            style={{ background: 'var(--surface2)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--brand-soft)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--surface2)'}
            onClick={() => navigate(`/dashboard/product/${t.subjectId}`)}
          >
            <PlayCircle size={18} style={{ color: 'var(--brand)', flexShrink: 0 }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{t.title}</p>
              <p className="text-xs" style={{ color: 'var(--text3)' }}>{t.questionCount} questions · {t.difficulty}</p>
            </div>
            <ChevronRight size={15} style={{ color: 'var(--text3)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
