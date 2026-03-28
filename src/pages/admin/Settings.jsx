import { useState } from 'react';
import { Save } from 'lucide-react';
import ThemePicker from '../../components/shared/ThemePicker';
import Toast from '../../components/shared/Toast';

export default function Settings() {
  const [platformName, setPlatformName] = useState('ReviewHub');
  const [adminEmail, setAdminEmail] = useState('admin@reviewhub.com');
  const [toast, setToast] = useState(null);

  const inputClass = 'w-full px-4 py-3 rounded-xl text-sm outline-none';
  const inputStyle = { background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text2)' };

  const Section = ({ title, desc, children }) => (
    <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>{title}</h3>
        {desc && <p className="text-sm mt-0.5" style={{ color: 'var(--text3)' }}>{desc}</p>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-2xl space-y-5">
      <Section title="Platform" desc="General platform configuration.">
        <div className="space-y-4">
          <div>
            <label style={labelStyle}>Platform Name</label>
            <input value={platformName} onChange={e => setPlatformName(e.target.value)} className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Admin Email</label>
            <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className={inputClass} style={inputStyle} />
          </div>
          <button
            onClick={() => setToast({ message: 'Settings saved' })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90"
            style={{ background: 'var(--brand)' }}
          >
            <Save size={15} /> Save Changes
          </button>
        </div>
      </Section>

      <Section title="Appearance" desc="Customize the admin interface colors.">
        <div className="flex items-center gap-4">
          <p className="text-sm" style={{ color: 'var(--text2)' }}>Change your admin theme:</p>
          <ThemePicker />
        </div>
      </Section>

      <Section title="Email Notifications" desc="Coming soon — configure email alerts for new users, access requests, and quiz completions.">
        <div className="py-4 text-center rounded-xl" style={{ background: 'var(--surface2)' }}>
          <p className="text-sm" style={{ color: 'var(--text3)' }}>🔧 This section will be available after backend integration.</p>
        </div>
      </Section>

      <Section title="Backup & Export" desc="Coming soon — export user data and quiz results as CSV.">
        <div className="py-4 text-center rounded-xl" style={{ background: 'var(--surface2)' }}>
          <p className="text-sm" style={{ color: 'var(--text3)' }}>🔧 This section will be available after backend integration.</p>
        </div>
      </Section>

      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
