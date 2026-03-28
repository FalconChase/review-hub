import Badge from '../shared/Badge';
import { subjects } from '../../data/mockData';

export default function UserList({ users }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Recent Users</h3>
      </div>
      <div className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
        {users.map(u => (
          <div key={u.uid} className="flex items-center gap-3 px-4 py-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: u.avatarColor }}
            >{u.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{u.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--text3)' }}>{u.email}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <Badge variant={u.status === 'active' ? 'success' : 'warning'}>
                {u.status === 'active' ? 'Active' : 'Pending'}
              </Badge>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{u.activeProducts?.length || 0} products</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
