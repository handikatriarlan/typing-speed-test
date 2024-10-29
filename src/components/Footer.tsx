import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isNearBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 100;
      
      setIsVisible(isScrollingDown || isNearBottom);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-white/50 dark:bg-surface-dark/50 
                     border-t border-gray-200 dark:border-gray-800 z-40"
        >
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Created with ♡ by{' '}
            <a
              href="https://handikatriarlan.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 
                       transition-colors"
            >
              handikatriarlan
            </a>
          </p>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}