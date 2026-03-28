import { useState } from 'react';
import Modal from '../shared/Modal';

const emptyForm = { name: '', email: '', status: 'active' };

export default function AddUserModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const initials = form.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    onSave({ ...form, uid: `user-${Date.now()}`, avatar: initials, avatarColor: '#4f87d4', joinedDaysAgo: 0, activeProducts: [] });
    setForm(emptyForm);
    onClose();
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl text-sm outline-none';
  const inputStyle = { background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' };
  const labelStyle = { color: 'var(--text2)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' };

  return (
    <Modal
      isOpen={isOpen} onClose={onClose}
      title="Add New User"
      subtitle="Create a user account manually."
      actions={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: 'var(--brand)' }}>Add User</button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label style={labelStyle}>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Maria Reyes" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="maria@email.com" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} className={inputClass} style={inputStyle}>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </Modal>
  );
}
