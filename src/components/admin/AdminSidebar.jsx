import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, Key, Layers, BarChart2, Settings, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { section: 'Overview', items: [{ to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' }] },
  { section: 'Manage', items: [
    { to: '/admin/products', icon: BookOpen, label: 'Products' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/access', icon: Key, label: 'Access & Licenses' },
    { to: '/admin/modules', icon: Layers, label: 'Modules & Content' },
  ]},
  { section: 'Insights', items: [{ to: '/admin/analytics', icon: BarChart2, label: 'Analytics' }] },
  { section: 'System', items: [{ to: '/admin/settings', icon: Settings, label: 'Settings' }] },
];

export default function AdminSidebar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside className="flex flex-col h-full" style={{ background: 'var(--surface)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: 'var(--brand)', fontFamily: "'Lora', serif" }}
        >R</div>
        <span className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>ReviewHub</span>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {nav.map(section => (
          <div key={section.section}>
            <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-1.5" style={{ color: 'var(--text3)' }}>
              {section.section}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'font-semibold'
                        : 'hover:bg-opacity-60'
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? 'var(--brand-soft)' : 'transparent',
                    color: isActive ? 'var(--brand)' : 'var(--text2)',
                  })}
                >
                  <Icon size={17} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User chip */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'var(--surface2)' }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'var(--brand)' }}
          >
            {currentUser?.avatar || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{currentUser?.name}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text3)' }}>{currentUser?.email}</p>
          </div>
          <button onClick={handleLogout} title="Log out" style={{ color: 'var(--text3)' }}>
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
