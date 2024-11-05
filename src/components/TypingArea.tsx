import { useEffect, useState } from 'react';
import { useTypingStore } from '../store/useTypingStore';
import { Stats } from './Stats';
import { ResultsModal } from './ResultsModal';

export function TypingArea() {
  const {
    text,
    userInput,
    isStarted,
    wpm,
    accuracy,
    elapsedTime,
    setUserInput,
    resetTest,
    updateStats,
  } = useTypingStore();

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let intervalId: number;
    
    if (isStarted && !showResults) {
      intervalId = window.setInterval(() => {
        updateStats();
      }, 100);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isStarted, showResults, updateStats]);

  useEffect(() => {
    if (userInput.length === text.length && userInput.length > 0) {
      setShowResults(true);
    }
  }, [userInput.length, text.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleReset = () => {
    resetTest();
    setShowResults(false);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Stats wpm={wpm} accuracy={accuracy} elapsedTime={elapsedTime} />
      
      <div className="mb-8 p-8 bg-surface-light dark:bg-surface-dark rounded-2xl
                    shadow-neo dark:shadow-neo-dark border border-gray-200 
                    dark:border-gray-800 transition-all duration-300">
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 leading-relaxed select-none"
           onCopy={(e) => e.preventDefault()}>
          {text.split('').map((char, index) => {
            let color = '';
            if (index < userInput.length) {
              color = userInput[index] === char
                ? 'text-accent-600 dark:text-accent-400'
                : 'text-red-500 dark:text-red-400';
            }
            return (
              <span key={index} className={color}>
                {char}
              </span>
            );
          })}
        </p>
        
        <textarea
          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50
                   border border-gray-200 dark:border-gray-800
                   focus:outline-none focus:ring-2 focus:ring-accent-400
                   dark:text-white resize-none transition-all duration-300"
          rows={3}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onPaste={handlePaste}
          placeholder="Start typing to begin the test..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleReset}
          className="w-full py-4 px-8 bg-accent-600 hover:bg-accent-700 active:bg-accent-800
                   dark:bg-accent-500 dark:hover:bg-accent-600 dark:active:bg-accent-700
                   text-white rounded-xl shadow-neo dark:shadow-neo-dark
                   transition-all duration-300 font-semibold text-lg
                   hover:translate-x-1 hover:translate-y-1 hover:shadow-none
                   active:scale-95"
        >
          Reset Test
        </button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Press Ctrl + R to reset the test
        </p>
      </div>

      <ResultsModal
        wpm={wpm}
        accuracy={accuracy}
        elapsedTime={elapsedTime}
        isOpen={showResults}
        onClose={handleReset}
      />
    </div>
  );
}