import { useState } from 'react';
import { Construction } from 'lucide-react';

function AlphaBanner({ className = '' }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`relative w-full bg-amber-100 dark:bg-amber-900 py-2 text-center text-[10px] sm:text-xs font-medium text-amber-800 dark:text-amber-400 flex items-center justify-center gap-1 border-b dark:border-amber-900/20 ${className}`}>
      <Construction className="w-3 h-3" />
      <span>HistoBowl is in alpha. Many features are incomplete or missing. Expect updates soon!</span>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss alpha notice"
        className="absolute inset-y-0 right-0 flex items-center justify-center px-3 sm:px-4 text-[10px] sm:text-xs font-medium text-amber-800 dark:text-amber-400 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-700 dark:focus-visible:ring-amber-400"
      >
        X
      </button>
    </div>
  );
}

export default AlphaBanner;
