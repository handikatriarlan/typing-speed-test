import { BsSun, BsMoon } from 'react-icons/bs';
import { useThemeStore } from '../store/useThemeStore';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-xl bg-surface-light dark:bg-surface-dark 
                shadow-neo dark:shadow-neo-dark border border-gray-200 dark:border-gray-800
                transition-all duration-300 hover:translate-x-1 hover:translate-y-1 
                hover:shadow-none active:scale-95"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <BsSun className="w-5 h-5 text-accent-400" />
      ) : (
        <BsMoon className="w-5 h-5 text-accent-600" />
      )}
    </button>
  );
}