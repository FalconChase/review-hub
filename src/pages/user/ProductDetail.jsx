import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle2, Lock, Clock } from 'lucide-react';
import QuizModal from '../../components/user/QuizModal';
import Badge from '../../components/shared/Badge';
import { subjects, topics, questions, userProgress } from '../../data/mockData';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizTopic, setQuizTopic] = useState(null);

  const subject = subjects.find(s => s.id === id);
  const subjectTopics = topics.filter(t => t.subjectId === id);
  const prog = userProgress.subjectProgress?.[id];

  if (!subject) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">🔍</p>
        <p className="font-semibold mb-4" style={{ color: 'var(--text)' }}>Product not found</p>
        <button onClick={() => navigate('/dashboard')} className="text-sm font-medium" style={{ color: 'var(--brand)' }}>← Back to Dashboard</button>
      </div>
    );
  }

  const quizQuestions = quizTopic
    ? questions.filter(q => q.topicId === quizTopic.id)
    : [];

  const statusConfig = {
    done:    { icon: <CheckCircle2 size={18} className="text-green-500" />, label: 'Done',    badge: 'success' },
    current: { icon: <PlayCircle size={18} style={{ color: 'var(--brand)' }} />, label: 'Current', badge: 'brand' },
    pending: { icon: <Lock size={18} className="text-gray-400" />, label: 'Pending', badge: 'default' },
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-1.5 text-sm font-medium hover:underline"
        style={{ color: 'var(--text2)' }}
      >
        <ArrowLeft size={15} /> Back to Dashboard
      </button>

      {/* Product header */}
      <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: subject.iconBg || 'var(--brand-soft)' }}>
            {subject.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>{subject.title}</h1>
              <Badge variant={subject.status === 'active' ? 'success' : 'warning'}>{subject.status}</Badge>
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--text2)' }}>{subject.description}</p>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text3)' }}>
              <span>📋 {subject.category}</span>
              <span>📚 {subjectTopics.length} topics</span>
              {prog?.bestScore && <span>⭐ Best: {prog.bestScore}%</span>}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {prog && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium" style={{ color: 'var(--text2)' }}>Overall Progress</span>
              <span className="text-xs font-bold" style={{ color: 'var(--brand)' }}>{prog.progress}%</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${prog.progress}%`, background: 'var(--brand)' }} />
            </div>
          </div>
        )}
      </div>

      {/* Topics list */}
      <div>
        <h2 className="font-bold text-base mb-3" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Topics</h2>
        <div className="space-y-2">
          {subjectTopics.map((t, i) => {
            const config = statusConfig[t.status] || statusConfig.pending;
            const isLocked = t.status === 'pending' && i > 0;
            const topicQs = questions.filter(q => q.topicId === t.id);

            return (
              <div
                key={t.id}
                className="rounded-xl p-4 flex items-center gap-4 transition-colors"
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${t.status === 'current' ? 'var(--brand)' : 'var(--border)'}`,
                  opacity: isLocked ? 0.6 : 1,
                }}
              >
                <div className="flex-shrink-0">{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{t.title}</p>
                  <div className="flex items-center gap-3 mt-0.5 text-xs" style={{ color: 'var(--text3)' }}>
                    <span className="flex items-center gap-1"><Clock size={11} /> {t.questionCount} questions</span>
                    <Badge variant={t.difficulty === 'Hard' ? 'danger' : t.difficulty === 'Easy' ? 'success' : 'info'} className="text-xs">{t.difficulty}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge variant={config.badge}>{config.label}</Badge>
                  {t.status === 'current' && topicQs.length > 0 && (
                    <button
                      onClick={() => setQuizTopic(t)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                      style={{ background: 'var(--brand)' }}
                    >
                      <PlayCircle size={13} /> Start Quiz
                    </button>
                  )}
                  {t.status === 'done' && topicQs.length > 0 && (
                    <button
                      onClick={() => setQuizTopic(t)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
                      style={{ background: 'var(--surface2)', color: 'var(--text2)', border: '1px solid var(--border)' }}
                    >
                      Retake
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={!!quizTopic}
        onClose={() => setQuizTopic(null)}
        questions={quizQuestions}
        topicTitle={quizTopic?.title || ''}
        onComplete={(score, total) => {
          console.log(`Quiz completed: ${score}/${total}`);
        }}
      />
    </div>
  );
}
