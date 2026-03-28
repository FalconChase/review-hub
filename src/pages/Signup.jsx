import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function Signup() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [submitted, setSubmitted] = useState(false);
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert('Passwords do not match.');
    setSubmitted(true);
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl text-sm outline-none';
  const inputStyle = { background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' };
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text2)' };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>Account created!</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text2)' }}>Your account has been registered. Wait for an admin to grant you access to review products.</p>
          <Link to="/login" className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: 'var(--brand)' }}>Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-3" style={{ background: 'var(--brand)', fontFamily: "'Lora', serif" }}>R</div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>Create an account</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>Join ReviewHub to start your review</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>First Name</label>
              <input name="firstName" value={form.firstName} onChange={onChange} placeholder="Juan" required className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={onChange} placeholder="dela Cruz" required className={inputClass} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@email.com" required className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" required className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input name="confirm" type="password" value={form.confirm} onChange={onChange} placeholder="••••••••" required className={inputClass} style={inputStyle} />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: 'var(--brand)' }}>
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-5" style={{ color: 'var(--text2)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--brand)' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
