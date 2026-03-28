import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HeroBanner from '../../components/user/HeroBanner';
import ProductCard from '../../components/user/ProductCard';
import ScoreHistory from '../../components/user/ScoreHistory';
import StreakTracker from '../../components/user/StreakTracker';
import UpNext from '../../components/user/UpNext';
import StatCard from '../../components/shared/StatCard';
import { subjects, topics, scores, userProgress } from '../../data/mockData';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const activeIds = currentUser?.activeProducts || [];
  const activeSubjects = subjects.filter(s => activeIds.includes(s.id));
  const allTopics = topics.filter(t => activeIds.includes(t.subjectId));
  const userScores = scores.filter(s => s.userId === currentUser?.uid);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <HeroBanner user={currentUser} progress={userProgress} />

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon="📦" label="Active Products" value={activeSubjects.length} iconBg="#eff6ff" />
        <StatCard icon="✅" label="Modules Completed" value={userProgress.totalModulesCompleted} iconBg="#f0fdf4" />
        <StatCard icon="🕐" label="Study Hours" value={`${userProgress.studyHoursThisMonth}h`} iconBg="#fefce8" changeLabel="This month" />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Products */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>My Products</h2>
          {activeSubjects.length === 0 ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-3xl mb-3">📚</p>
              <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>No products yet</p>
              <p className="text-sm" style={{ color: 'var(--text3)' }}>Ask your admin to grant you access to review products.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {activeSubjects.map(s => (
                <ProductCard
                  key={s.id}
                  subject={s}
                  progress={userProgress.subjectProgress?.[s.id]}
                  topics={topics.filter(t => t.subjectId === s.id)}
                  onContinue={() => navigate(`/dashboard/product/${s.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <StreakTracker streak={userProgress.streak} recentActivity={userProgress.recentActivity} />
          <UpNext topics={allTopics} />
        </div>
      </div>

      {/* Score history */}
      {userScores.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Recent Scores</h2>
            <button onClick={() => navigate('/dashboard/scores')} className="text-xs font-semibold hover:underline" style={{ color: 'var(--brand)' }}>View all →</button>
          </div>
          <ScoreHistory scores={userScores} limit={3} />
        </div>
      )}
    </div>
  );
}
