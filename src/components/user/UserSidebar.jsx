import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Star, TrendingUp, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subjects } from '../../data/mockData';

export default function UserSidebar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const activeIds = currentUser?.activeProducts || [];
  const activeSubjects = subjects.filter(s => activeIds.includes(s.id));
  const lockedSubjects = subjects.filter(s => !activeIds.includes(s.id));

  const handleLogout = () => { logout(); navigate('/login'); };

  const linkStyle = ({ isActive }) => ({
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.625rem 0.75rem', borderRadius: '0.75rem',
    fontSize: '0.875rem', fontWeight: isActive ? 600 : 500,
    background: isActive ? 'var(--brand-soft)' : 'transparent',
    color: isActive ? 'var(--brand)' : 'var(--text2)',
    textDecoration: 'none', transition: 'all 0.15s',
  });

  return (
    <aside className="flex flex-col h-full" style={{ background: 'var(--surface)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: 'var(--brand)', fontFamily: "'Lora', serif" }}>R</div>
        <span className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>ReviewHub</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Main nav */}
        <div className="space-y-0.5 mb-5">
          <NavLink to="/dashboard" end style={linkStyle}>
            <LayoutDashboard size={17} /> Home
          </NavLink>
          <NavLink to="/dashboard/scores" style={linkStyle}>
            <Star size={17} /> My Scores
          </NavLink>
          <NavLink to="/dashboard/progress" style={linkStyle}>
            <TrendingUp size={17} /> Progress
          </NavLink>
        </div>

        {/* Active products */}
        {activeSubjects.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-2" style={{ color: 'var(--text3)' }}>My Products</p>
            <div className="space-y-0.5">
              {activeSubjects.map(s => (
                <NavLink key={s.id} to={`/dashboard/product/${s.id}`} style={linkStyle}>
                  <span className="text-base leading-none">{s.icon}</span>
                  <span className="truncate">{s.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* Locked products */}
        {lockedSubjects.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-2" style={{ color: 'var(--text3)' }}>Locked</p>
            <div className="space-y-0.5">
              {lockedSubjects.map(s => (
                <div key={s.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-40 cursor-not-allowed select-none" style={{ color: 'var(--text3)' }}>
                  <span className="text-base leading-none">{s.icon}</span>
                  <span className="text-sm truncate flex-1">{s.title}</span>
                  <Lock size={13} />
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User chip */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'var(--surface2)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'var(--brand)' }}>
            {currentUser?.avatar || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{currentUser?.name}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text3)' }}>Student</p>
          </div>
          <button onClick={handleLogout} title="Log out" style={{ color: 'var(--text3)' }}>
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
