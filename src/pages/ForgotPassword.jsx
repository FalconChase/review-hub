import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-3" style={{ background: 'var(--brand)', fontFamily: "'Lora', serif" }}>R</div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>Reset password</h1>
          <p className="text-sm mt-1 text-center" style={{ color: 'var(--text2)' }}>We'll send a reset link to your email</p>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {!sent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text2)' }}>Email address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text3)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
              </div>
              <button
                onClick={() => setSent(true)}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: 'var(--brand)' }}
              >
                Send Reset Link
              </button>
            </div>
          ) : (
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'var(--brand-soft)' }}>
                <Mail size={22} style={{ color: 'var(--brand)' }} />
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                If <strong>{email}</strong> is registered, a reset link has been sent.
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>Check your inbox and spam folder.</p>
            </div>
          )}
        </div>

        <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm mt-5 hover:underline" style={{ color: 'var(--text2)' }}>
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </div>
    </div>
  );
}
