import { useState } from 'react';
import { Search, Key, Edit2, UserX } from 'lucide-react';
import Badge from '../../components/shared/Badge';
import AddUserModal from '../../components/admin/AddUserModal';
import GrantAccessModal from '../../components/admin/GrantAccessModal';
import Toast from '../../components/shared/Toast';
import { users as initialUsers, subjects } from '../../data/mockData';

export default function Users() {
  const [userList, setUserList] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = userList.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getProductNames = (ids = []) =>
    ids.map(id => subjects.find(s => s.id === id)?.title).filter(Boolean);

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl flex-1 max-w-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <Search size={15} style={{ color: 'var(--text3)' }} />
          <input
            placeholder="Search users…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
            style={{ color: 'var(--text)' }}
          />
        </div>
        <button
          onClick={() => setModal('user')}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90"
          style={{ background: 'var(--brand)' }}
        >+ Add User</button>
      </div>

      <p className="text-sm" style={{ color: 'var(--text3)' }}>{filtered.length} user{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              {['User', 'Email', 'Status', 'Products', 'Joined', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr
                key={u.uid}
                style={{ background: 'var(--surface)', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: u.avatarColor }}>{u.avatar}</div>
                    <span className="font-semibold" style={{ color: 'var(--text)' }}>{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{u.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={u.status === 'active' ? 'success' : 'warning'}>
                    {u.status === 'active' ? 'Active' : 'Pending'}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {getProductNames(u.activeProducts).slice(0, 2).map(name => (
                      <span key={name} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>{name}</span>
                    ))}
                    {u.activeProducts?.length > 2 && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface2)', color: 'var(--text3)' }}>+{u.activeProducts.length - 2}</span>
                    )}
                    {!u.activeProducts?.length && <span className="text-xs" style={{ color: 'var(--text3)' }}>None</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text3)' }}>
                  {u.joinedDaysAgo === 0 ? 'Today' : `${u.joinedDaysAgo}d ago`}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setModal('access')} className="p-1.5 rounded-lg hover:bg-green-50 hover:text-green-600" style={{ color: 'var(--text3)' }} title="Grant Access"><Key size={15} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600" style={{ color: 'var(--text3)' }} title="Edit"><Edit2 size={15} /></button>
                    <button
                      onClick={() => {
                        setUserList(prev => prev.map(x => x.uid === u.uid ? { ...x, status: 'inactive' } : x));
                        setToast({ message: `${u.name} deactivated` });
                      }}
                      className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500"
                      style={{ color: 'var(--text3)' }} title="Deactivate"
                    ><UserX size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal
        isOpen={modal === 'user'}
        onClose={() => setModal(null)}
        onSave={(u) => { setUserList(prev => [...prev, u]); setToast({ message: 'User added' }); }}
      />
      <GrantAccessModal
        isOpen={modal === 'access'}
        onClose={() => setModal(null)}
        onSave={() => setToast({ message: 'Access granted' })}
      />
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
