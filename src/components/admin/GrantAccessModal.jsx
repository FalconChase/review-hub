import { useState } from 'react';
import Modal from '../shared/Modal';
import { users, subjects } from '../../data/mockData';

export default function GrantAccessModal({ isOpen, onClose, onSave, preselectedProduct }) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(preselectedProduct?.id || '');
  const [expiry, setExpiry] = useState('');

  const handleSubmit = () => {
    if (!selectedUser || !selectedProduct) return;
    onSave({ userId: selectedUser, productId: selectedProduct, expiry });
    setSelectedUser(''); setSelectedProduct(''); setExpiry('');
    onClose();
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl text-sm outline-none';
  const inputStyle = { background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' };
  const labelStyle = { color: 'var(--text2)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' };

  return (
    <Modal
      isOpen={isOpen} onClose={onClose}
      title="Grant Product Access"
      subtitle="Assign a product to a user."
      actions={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: 'var(--brand)' }}>Grant Access</button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label style={labelStyle}>Select User</label>
          <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className={inputClass} style={inputStyle}>
            <option value="">— Choose a user —</option>
            {users.map(u => <option key={u.uid} value={u.uid}>{u.name} ({u.email})</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Select Product</label>
          <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className={inputClass} style={inputStyle}>
            <option value="">— Choose a product —</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Access Expiry (optional)</label>
          <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)} className={inputClass} style={inputStyle} />
        </div>
      </div>
    </Modal>
  );
}
