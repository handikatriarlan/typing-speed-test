import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: window.localStorage.getItem('theme') === 'dark' || !window.localStorage.getItem('theme'),
      toggleTheme: () => {
        set((state) => {
          const newTheme = !state.isDarkMode ? 'dark' : 'light';
          window.localStorage.setItem('theme', newTheme);
          return { isDarkMode: !state.isDarkMode };
        });
      },
    }),
    {
      name: 'theme-storage',
      getStorage: () => localStorage,
    }
  )
);
