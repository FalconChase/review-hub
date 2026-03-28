import { Flame, Trophy, TrendingUp } from 'lucide-react';

export default function HeroBanner({ user, progress }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div
      className="rounded-2xl p-6 text-white relative overflow-hidden mb-6"
      style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-mid) 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10 bg-white" />
      <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full opacity-10 bg-white" />

      <div className="relative">
        <p className="text-sm font-medium opacity-80 mb-1">{greeting} 👋</p>
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Lora', serif" }}>
          {user?.name || 'Student'}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-15 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-1 opacity-80 text-xs font-medium">
              <TrendingUp size={13} /> Overall Progress
            </div>
            <div className="text-2xl font-bold">{progress?.overallProgress ?? 0}%</div>
          </div>
          <div className="bg-white bg-opacity-15 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-1 opacity-80 text-xs font-medium">
              <Trophy size={13} /> Best Score
            </div>
            <div className="text-2xl font-bold">{progress?.bestScore ?? 0}%</div>
          </div>
          <div className="bg-white bg-opacity-15 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-1 opacity-80 text-xs font-medium">
              <Flame size={13} /> Study Streak
            </div>
            <div className="text-2xl font-bold">{progress?.streak ?? 0} <span className="text-base font-medium">days</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
