import { useState } from 'react';
import Badge from '../../components/shared/Badge';
import GrantAccessModal from '../../components/admin/GrantAccessModal';
import Toast from '../../components/shared/Toast';
import { users, subjects } from '../../data/mockData';
import { Trash2 } from 'lucide-react';

// Build mock license records from existing data
const buildLicenses = () => {
  const records = [];
  users.forEach(u => {
    (u.activeProducts || []).forEach(pid => {
      const subject = subjects.find(s => s.id === pid);
      if (!subject) return;
      records.push({
        id: `${u.uid}-${pid}`,
        userId: u.uid,
        userName: u.name,
        userAvatar: u.avatar,
        userColor: u.avatarColor,
        productId: pid,
        productName: subject.title,
        accessStart: '2026-01-15',
        expiry: '2026-12-31',
        status: 'active',
      });
    });
  });
  return records;
};

export default function AccessLicenses() {
  const [licenses, setLicenses] = useState(buildLicenses);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(null);

  const revoke = (id) => {
    setLicenses(prev => prev.filter(l => l.id !== id));
    setToast({ message: 'Access revoked' });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--text3)' }}>{licenses.length} active license{licenses.length !== 1 ? 's' : ''}</p>
        <button
          onClick={() => setModal(true)}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90"
          style={{ background: 'var(--brand)' }}
        >+ Grant New Access</button>
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              {['User', 'Product', 'Start Date', 'Expiry', 'Status', 'Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {licenses.map((l, i) => (
              <tr
                key={l.id}
                style={{ background: 'var(--surface)', borderBottom: i < licenses.length - 1 ? '1px solid var(--border)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: l.userColor }}>{l.userAvatar}</div>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>{l.userName}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{l.productName}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text3)' }}>{l.accessStart}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text3)' }}>{l.expiry}</td>
                <td className="px-4 py-3"><Badge variant="success">Active</Badge></td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => revoke(l.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                    style={{ color: 'var(--text3)' }}
                  >
                    <Trash2 size={13} /> Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GrantAccessModal
        isOpen={modal}
        onClose={() => setModal(false)}
        onSave={({ userId, productId }) => {
          const user = users.find(u => u.uid === userId);
          const subject = subjects.find(s => s.id === productId);
          if (!user || !subject) return;
          setLicenses(prev => [...prev, {
            id: `${userId}-${productId}-${Date.now()}`,
            userId, userName: user.name, userAvatar: user.avatar, userColor: user.avatarColor,
            productId, productName: subject.title,
            accessStart: new Date().toISOString().split('T')[0],
            expiry: '2026-12-31', status: 'active',
          }]);
          setToast({ message: 'Access granted successfully' });
        }}
      />
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
