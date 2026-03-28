import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    login(role);
    navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard');
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors';
  const inputStyle = { background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-3" style={{ background: 'var(--brand)', fontFamily: "'Lora', serif" }}>R</div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Lora', serif", color: 'var(--text)' }}>Welcome back</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>Log in to continue reviewing</p>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {/* Demo note */}
          <div className="mb-5 px-3 py-2.5 rounded-xl text-xs font-medium" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
            🔧 Demo mode — backend not connected yet
          </div>

          {/* Demo buttons */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              onClick={() => handleDemoLogin('admin')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--brand)' }}
            >
              <LogIn size={13} /> Login as Admin
            </button>
            <button
              onClick={() => handleDemoLogin('user')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
            >
              <LogIn size={13} /> Login as User
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--text3)' }}>or use email</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text2)' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text2)' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} style={{ ...inputStyle, paddingRight: '2.75rem' }} />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text3)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs font-medium hover:underline" style={{ color: 'var(--brand)' }}>Forgot password?</Link>
            </div>
            <button
              className="w-full py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: 'var(--brand)' }}
            >
              Log In
            </button>
          </div>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: 'var(--text2)' }}>
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold hover:underline" style={{ color: 'var(--brand)' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
