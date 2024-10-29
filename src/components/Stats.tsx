interface StatsProps {
  wpm: number;
  accuracy: number;
  elapsedTime: number;
}

export function Stats({ wpm, accuracy, elapsedTime }: StatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-12">
      {[
        { label: 'WPM', value: wpm },
        { label: 'Accuracy', value: `${accuracy}%` },
        { label: 'Time', value: `${elapsedTime}s` },
      ].map(({ label, value }) => (
        <div key={label} 
             className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl
                        shadow-neo dark:shadow-neo-dark border border-gray-200 
                        dark:border-gray-800 transition-all duration-300">
          <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent-400 to-accent-600 
                         bg-clip-text text-transparent">{value}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        </div>
      ))}
    </div>
  );
}