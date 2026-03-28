import { useState } from 'react';
import { Palette, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PRESETS = [
  { key: 'ocean',  color: '#3b7dd8', label: 'Ocean' },
  { key: 'forest', color: '#27855e', label: 'Forest' },
  { key: 'sunset', color: '#e8620f', label: 'Sunset' },
  { key: 'rose',   color: '#c4365a', label: 'Rose' },
  { key: 'violet', color: '#7c4dcc', label: 'Violet' },
];

export default function ThemePicker() {
  const { theme, setTheme, isDark, toggleDark } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-opacity-10"
        style={{ background: 'var(--surface2)', color: 'var(--text2)' }}
        title="Customize theme"
      >
        <Palette size={18} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-11 z-50 rounded-2xl shadow-xl p-4 w-56"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text3)' }}>Color Theme</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {PRESETS.map(p => (
                <button
                  key={p.key}
                  title={p.label}
                  onClick={() => setTheme(p.key)}
                  className="w-8 h-8 rounded-full transition-transform hover:scale-110 relative"
                  style={{ background: p.color }}
                >
                  {theme === p.key && !isDark && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={toggleDark}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl transition-colors"
                style={{
                  background: isDark ? 'var(--brand-soft)' : 'var(--surface2)',
                  color: isDark ? 'var(--brand)' : 'var(--text2)',
                }}
              >
                <span className="text-sm font-medium">Dark Mode</span>
                {isDark ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
