import { useState } from 'react';
import Modal from '../shared/Modal';

const emptyForm = { title: '', category: 'Licensure', exam: '', description: '', status: 'active' };

export default function AddProductModal({ isOpen, onClose, onSave, product }) {
  const [form, setForm] = useState(product || emptyForm);
  const isEdit = !!product;

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSave({ ...form, id: product?.id || `prod-${Date.now()}` });
    setForm(emptyForm);
    onClose();
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-colors';
  const inputStyle = { background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' };
  const labelStyle = { color: 'var(--text2)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Product' : 'Add New Product'}
      subtitle="Fill in the product details below."
      actions={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: 'var(--brand)' }}>
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label style={labelStyle}>Product Name</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. NLE Reviewer Pro" className={inputClass} style={inputStyle} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={labelStyle}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass} style={inputStyle}>
              <option>Licensure</option>
              <option>Certification</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass} style={inputStyle}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Exam / Course</label>
          <input name="exam" value={form.exam} onChange={handleChange} placeholder="e.g. Nursing Licensure Exam" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Brief description of this product..." className={inputClass} style={{ ...inputStyle, resize: 'none' }} />
        </div>
      </div>
    </Modal>
  );
}
