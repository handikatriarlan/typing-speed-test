/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#e879f9',
          400: '#d946ef',
          500: '#c026d3',
          600: '#a21caf',
          700: '#86198f',
          800: '#701a75',
          900: '#4a044e',
        },
        surface: {
          light: '#ffffff',
          dark: '#1a1625',
        },
        background: {
          light: '#f8fafc',
          dark: '#0f0a1e',
        }
      },
      boxShadow: {
        'neo': '8px 8px 0 0 rgba(0, 0, 0, 0.15)',
        'neo-dark': '8px 8px 0 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}