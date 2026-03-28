import { Outlet, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import UserSidebar from '../components/user/UserSidebar';
import ThemePicker from '../components/shared/ThemePicker';

const pageTitles = {
  '/dashboard':          { title: 'My Dashboard',  sub: 'Track your progress and continue studying' },
  '/dashboard/scores':   { title: 'My Scores',     sub: 'Review your quiz history' },
  '/dashboard/progress': { title: 'My Progress',   sub: 'See how far you\'ve come' },
};

export default function UserLayout() {
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: 'ReviewHub', sub: '' };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <div className="w-60 flex-shrink-0 border-r h-full" style={{ borderColor: 'var(--border)' }}>
        <UserSidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header
          className="flex items-center gap-4 px-6 py-3 border-b flex-shrink-0 sticky top-0 z-20"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold leading-tight" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>
              {page.title}
            </h1>
            <p className="text-xs" style={{ color: 'var(--text3)' }}>{page.sub}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <ThemePicker />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
