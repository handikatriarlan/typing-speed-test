import { useEffect } from 'react';
import { FaTrophy, FaKeyboard, FaBullseye } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultsModalProps {
  wpm: number;
  accuracy: number;
  elapsedTime: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ResultsModal({ wpm, accuracy, elapsedTime, isOpen, onClose }: ResultsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-neo dark:shadow-neo-dark
                     max-w-md w-full border border-gray-200 dark:border-gray-800"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-accent-400 to-accent-600 
                         bg-clip-text text-transparent">
              Test Complete!
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <FaKeyboard className="w-8 h-8 text-accent-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{wpm} WPM</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Typing Speed</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <FaBullseye className="w-8 h-8 text-accent-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{accuracy}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <FaTrophy className="w-8 h-8 text-accent-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{elapsedTime}s</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Time Taken</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full mt-8 py-3 px-6 bg-accent-600 hover:bg-accent-700 text-white rounded-xl
                       transition-all duration-300 font-semibold hover:translate-y-1"
            >
              Try Again
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}