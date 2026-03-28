import { ArrowRight, CheckCircle2, Circle, Lock } from 'lucide-react';

export default function ProductCard({ subject, progress, topics, onContinue }) {
  const pct = progress?.progress ?? 0;
  const best = progress?.bestScore;
  const attempts = progress?.attempts ?? 0;

  const statusIcon = {
    done:    <CheckCircle2 size={13} className="text-green-500" />,
    current: <Circle size={13} style={{ color: 'var(--brand)' }} />,
    pending: <Circle size={13} className="text-gray-300" />,
  };

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: subject.iconBg || 'var(--brand-soft)' }}>
            {subject.icon}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
            {subject.category}
          </span>
        </div>
        <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>{subject.title}</h3>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>{subject.description}</p>
      </div>

      {/* Progress */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium" style={{ color: 'var(--text2)' }}>Progress</span>
          <span className="text-xs font-bold" style={{ color: 'var(--brand)' }}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: 'var(--brand)' }} />
        </div>
      </div>

      {/* Topics */}
      {topics?.length > 0 && (
        <div className="px-5 pb-4 flex flex-wrap gap-1.5">
          {topics.slice(0, 4).map(t => (
            <div key={t.id} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>
              {statusIcon[t.status] || statusIcon.pending}
              <span className="truncate max-w-[100px]">{t.title}</span>
            </div>
          ))}
          {topics.length > 4 && (
            <div className="px-2 py-1 rounded-lg text-xs" style={{ background: 'var(--surface2)', color: 'var(--text3)' }}>
              +{topics.length - 4} more
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto px-5 py-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <div className="text-xs" style={{ color: 'var(--text3)' }}>
          {best != null && <span className="mr-3">Best: <strong style={{ color: 'var(--text2)' }}>{best}%</strong></span>}
          <span>{attempts} attempt{attempts !== 1 ? 's' : ''}</span>
        </div>
        <button
          onClick={onContinue}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--brand)' }}
        >
          Continue <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
