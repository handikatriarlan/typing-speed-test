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
    updateElapsedTime,
    startTest,
  } = useTypingStore();

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: { target: { value: any; }; }) => {
    const input = e.target.value;

    if (!isStarted && input.length > 0) {
      startTest();
    }

    setUserInput(input);
  };

  useEffect(() => {
    if (userInput.length === text.length && userInput.length > 0) {
      setShowResults(true);
    }
  }, [userInput.length, text.length]);

  useEffect(() => {
    let interval: number | undefined;

    if (isStarted && !showResults) {
      interval = setInterval(() => {
        updateElapsedTime();
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isStarted, showResults]);

  const handleReset = () => {
    resetTest();
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Stats wpm={wpm} accuracy={accuracy} elapsedTime={elapsedTime} />
      <div className="mb-8 p-8 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-neo dark:shadow-neo-dark border border-gray-200 dark:border-gray-800 transition-all duration-300">
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
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
          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 dark:text-white resize-none transition-all duration-300"
          rows={3}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here to begin the game..."
          disabled={showResults}
        />
        
        {!showResults && isStarted && (
          <button
            onClick={handleReset}
            className="mt-4 w-full py-2 bg-accent-600 dark:bg-accent-500 dark:hover:bg-accent-600 dark:active:bg-accent-700 text-white rounded-xl shadow-neo dark:shadow-neo-dark transition-all duration-300 font-semibold text-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95"
          >
            Reset Test
          </button>
        )}

        {!isStarted && (
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Type anything to start the game.
          </p>
        )}
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