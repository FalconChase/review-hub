import { useState } from 'react';
import { Plus } from 'lucide-react';
import Badge from '../../components/shared/Badge';
import Modal from '../../components/shared/Modal';
import Toast from '../../components/shared/Toast';
import { subjects, topics as initialTopics } from '../../data/mockData';

const statusVariant = { done: 'success', current: 'brand', pending: 'warning' };
const statusLabel   = { done: 'Done', current: 'Current', pending: 'Pending' };

export default function ModulesContent() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.id || null);
  const [topics, setTopics] = useState(initialTopics);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: '', questionCount: '', difficulty: 'Medium' });
  const [toast, setToast] = useState(null);

  const subjectTopics = topics.filter(t => t.subjectId === selectedSubject);
  const activeSubject = subjects.find(s => s.id === selectedSubject);

  const handleAdd = () => {
    if (!form.title.trim()) return;
    setTopics(prev => [...prev, {
      id: `topic-${Date.now()}`,
      subjectId: selectedSubject,
      title: form.title,
      questionCount: parseInt(form.questionCount) || 0,
      difficulty: form.difficulty,
      status: 'pending',
    }]);
    setForm({ title: '', questionCount: '', difficulty: 'Medium' });
    setModal(false);
    setToast({ message: 'Topic added' });
  };

  const inputStyle = { background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' };
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text2)' };

  return (
    <div className="flex gap-5 h-full">
      {/* Left: Subject list */}
      <div className="w-56 flex-shrink-0 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3 px-1" style={{ color: 'var(--text3)' }}>Products</p>
        {subjects.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSubject(s.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors text-sm font-medium"
            style={{
              background: selectedSubject === s.id ? 'var(--brand-soft)' : 'var(--surface)',
              color: selectedSubject === s.id ? 'var(--brand)' : 'var(--text2)',
              border: '1px solid var(--border)',
            }}
          >
            <span className="text-lg leading-none">{s.icon}</span>
            <span className="truncate">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Right: Topics */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>
              {activeSubject?.title}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{subjectTopics.length} topics</p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90"
            style={{ background: 'var(--brand)' }}
          ><Plus size={15} /> Add Topic</button>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
                {['Topic', 'Questions', 'Difficulty', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjectTopics.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-sm" style={{ color: 'var(--text3)' }}>No topics yet. Add one above.</td></tr>
              )}
              {subjectTopics.map((t, i) => (
                <tr
                  key={t.id}
                  style={{ background: 'var(--surface)', borderBottom: i < subjectTopics.length - 1 ? '1px solid var(--border)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text)' }}>{t.title}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{t.questionCount}</td>
                  <td className="px-4 py-3">
                    <Badge variant={t.difficulty === 'Hard' ? 'danger' : t.difficulty === 'Easy' ? 'success' : 'info'}>
                      {t.difficulty}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[t.status] || 'default'}>{statusLabel[t.status] || t.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Topic Modal */}
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Add New Topic"
        subtitle={`Adding to: ${activeSubject?.title}`}
        actions={
          <>
            <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: 'var(--brand)' }}>Add Topic</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label style={labelStyle}>Topic Name</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Number Theory & Algebra" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Question Count</label>
              <input type="number" value={form.questionCount} onChange={e => setForm(f => ({ ...f, questionCount: e.target.value }))} placeholder="30" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
