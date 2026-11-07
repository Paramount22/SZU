import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="absolute xl:fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all z-50 hover:scale-110"
      aria-label="Prepnúť tmavý režim"
      title="Prepnúť tmavý režim"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
