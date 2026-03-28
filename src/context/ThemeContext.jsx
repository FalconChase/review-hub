import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const THEMES = ['ocean', 'forest', 'sunset', 'rose', 'violet'];

export function ThemeProvider({ storageKey = 'theme', children }) {
  const [theme, setThemeState] = useState(() => localStorage.getItem(storageKey) || 'ocean');
  const [isDark, setIsDark] = useState(() => localStorage.getItem(storageKey + '-dark') === 'true');

  useEffect(() => {
    const body = document.body;
    // Remove all theme attrs
    THEMES.forEach(t => body.removeAttribute('data-theme'));
    body.removeAttribute('data-theme');

    if (isDark) {
      body.setAttribute('data-theme', 'dark');
    } else if (theme !== 'ocean') {
      body.setAttribute('data-theme', theme);
    }
    localStorage.setItem(storageKey, theme);
    localStorage.setItem(storageKey + '-dark', isDark);
  }, [theme, isDark, storageKey]);

  const setTheme = (t) => {
    setThemeState(t);
    setIsDark(false);
  };

  const toggleDark = () => setIsDark(d => !d);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
