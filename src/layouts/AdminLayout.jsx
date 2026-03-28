import { Outlet, useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import ThemePicker from '../components/shared/ThemePicker';

const pageTitles = {
  '/admin/dashboard': { title: 'Dashboard',        sub: 'Welcome back, Admin' },
  '/admin/products':  { title: 'Products',          sub: 'Manage your review products' },
  '/admin/users':     { title: 'Users',             sub: 'Manage registered users' },
  '/admin/access':    { title: 'Access & Licenses', sub: 'Control product access' },
  '/admin/modules':   { title: 'Modules & Content', sub: 'Manage topics and questions' },
  '/admin/analytics': { title: 'Analytics',         sub: 'Usage and performance stats' },
  '/admin/settings':  { title: 'Settings',          sub: 'Platform configuration' },
};

export default function AdminLayout() {
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: 'Admin', sub: '' };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <div className="w-60 flex-shrink-0 border-r h-full" style={{ borderColor: 'var(--border)' }}>
        <AdminSidebar />
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
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
              <Search size={15} style={{ color: 'var(--text3)' }} />
              <input placeholder="Search..." className="bg-transparent text-sm outline-none w-36" style={{ color: 'var(--text)' }} />
            </div>

            {/* Notifications */}
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
