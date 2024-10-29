import { ThemeToggle } from './components/ThemeToggle';
import { TypingArea } from './components/TypingArea';
import { Footer } from './components/Footer';
import { useThemeStore } from './store/useThemeStore';

export function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <div className="container mx-auto px-4 py-16">
          <ThemeToggle />
          
          <h1 className="text-5xl font-bold text-center mb-3 text-gray-800 dark:text-white bg-gradient-to-r 
                       from-accent-400 to-accent-600 bg-clip-text text-transparent">
            Typing Speed Test
          </h1>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-400">
            Test your typing speed and accuracy
          </p>

          <TypingArea />
        </div>
        <Footer />
      </div>
    </div>
  );
}