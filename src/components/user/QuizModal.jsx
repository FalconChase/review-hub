import { useState } from 'react';
import { X, CheckCircle2, XCircle, RotateCcw, ChevronRight } from 'lucide-react';

const PASS_THRESHOLD = 75;

export default function QuizModal({ isOpen, onClose, onComplete, questions = [], topicTitle = 'Quiz' }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const reset = () => {
    setCurrent(0); setSelected(null);
    setAnswered(false); setScore(0); setShowResult(false);
  };

  const handleClose = () => { reset(); onClose(); };

  if (!isOpen) return null;

  const q = questions[current];
  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= PASS_THRESHOLD;

  const handleSelect = (choiceId) => {
    if (answered) return;
    setSelected(choiceId);
    setAnswered(true);
    if (choiceId === q.correctAnswer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      onComplete?.(score, total);
    }
  };

  const getChoiceStyle = (choiceId) => {
    const base = { transition: 'all 0.15s', cursor: answered ? 'default' : 'pointer', borderRadius: '0.75rem', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '2px solid', marginBottom: '0.5rem' };
    if (!answered) {
      return { ...base, borderColor: selected === choiceId ? 'var(--brand)' : 'var(--border)', background: selected === choiceId ? 'var(--brand-soft)' : 'var(--surface2)' };
    }
    if (choiceId === q.correctAnswer) return { ...base, borderColor: '#16a34a', background: '#f0fdf4' };
    if (choiceId === selected && choiceId !== q.correctAnswer) return { ...base, borderColor: '#dc2626', background: '#fef2f2' };
    return { ...base, borderColor: 'var(--border)', background: 'var(--surface2)', opacity: 0.5 };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ background: 'var(--surface)', maxHeight: '92vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h2 className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>{topicTitle}</h2>
            {!showResult && <p className="text-xs" style={{ color: 'var(--text3)' }}>Question {current + 1} of {total}</p>}
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-lg" style={{ color: 'var(--text3)' }}><X size={18} /></button>
        </div>

        {!showResult ? (
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Progress bar */}
            <div className="px-6 pt-4 pb-2">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${((current) / total) * 100}%`, background: 'var(--brand)' }} />
              </div>
            </div>

            {/* Question */}
            <div className="px-6 py-4">
              <div className="mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>{q?.difficulty || 'Medium'}</span>
              </div>
              <p className="text-base font-semibold mt-3 leading-relaxed" style={{ color: 'var(--text)' }}>{q?.stem}</p>
            </div>

            {/* Choices */}
            <div className="px-6 pb-2">
              {q?.choices.map(c => (
                <div key={c.id} style={getChoiceStyle(c.id)} onClick={() => handleSelect(c.id)}>
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 uppercase"
                    style={{
                      borderColor: answered && c.id === q.correctAnswer ? '#16a34a'
                        : answered && c.id === selected ? '#dc2626'
                        : 'var(--border)',
                      color: answered && c.id === q.correctAnswer ? '#16a34a'
                        : answered && c.id === selected ? '#dc2626'
                        : 'var(--text3)',
                    }}
                  >{c.id}</span>
                  <span className="text-sm" style={{ color: 'var(--text)' }}>{c.text}</span>
                  {answered && c.id === q.correctAnswer && <CheckCircle2 size={16} className="ml-auto text-green-600 flex-shrink-0" />}
                  {answered && c.id === selected && c.id !== q.correctAnswer && <XCircle size={16} className="ml-auto text-red-500 flex-shrink-0" />}
                </div>
              ))}
            </div>

            {/* Explanation */}
            {answered && (
              <div className="mx-6 mb-4 p-3 rounded-xl text-sm" style={{ background: selected === q.correctAnswer ? '#f0fdf4' : '#fef2f2', color: selected === q.correctAnswer ? '#166534' : '#991b1b' }}>
                <strong>{selected === q.correctAnswer ? '✓ Correct! ' : '✗ Incorrect. '}</strong>
                {q.explanation}
              </div>
            )}

            {/* Next button */}
            {answered && (
              <div className="px-6 pb-6 mt-auto">
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ background: 'var(--brand)' }}
                >
                  {current < total - 1 ? 'Next Question' : 'See Results'}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Result screen */
          <div className="flex flex-col items-center justify-center p-8 text-center flex-1">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center mb-4 text-3xl font-bold"
              style={{
                background: passed ? '#f0fdf4' : '#fef2f2',
                color: passed ? '#16a34a' : '#dc2626',
                fontFamily: "'Lora', serif",
                border: `4px solid ${passed ? '#16a34a' : '#dc2626'}`,
              }}
            >
              {pct}%
            </div>

            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>
              {passed ? '🎉 Well done!' : '📚 Keep studying'}
            </h3>
            <p className="text-sm mb-1" style={{ color: 'var(--text2)' }}>
              {passed ? 'You passed this quiz!' : 'You didn\'t reach the passing score yet.'}
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text3)' }}>
              {score} correct out of {total} questions
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--surface2)', color: 'var(--text2)' }}
              >Close</button>
              <button
                onClick={reset}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90"
                style={{ background: 'var(--brand)' }}
              >
                <RotateCcw size={15} /> Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
