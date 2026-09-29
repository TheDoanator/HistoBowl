import './App.css'
import { useState, useEffect } from 'react';
import { Construction, Sun, Moon, Menu, X } from 'lucide-react'; 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import our router tools
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import Players  from './pages/Players';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      // Sync the DOM instantly on initialization before first paint
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
      return savedTheme;
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) document.documentElement.classList.add('dark');
    return systemPrefersDark ? 'dark' : 'light';
  });

  const toggleTheme = () => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      
      // Synchronous DOM manipulation feels instant
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      localStorage.setItem('theme', nextTheme);
      setTheme(nextTheme);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      // #020617 is Tailwind's slate-950 (your dark bg)
      // #f8fafc is Tailwind's slate-50 (your light bg)
      metaThemeColor.setAttribute(
        'content', 
        theme === 'dark' ? '#020617' : '#f8fafc'
      );
    }
  }, [theme]);

  return (
    // 1. Wrap everything in BrowserRouter so routing works across the whole app
    <BrowserRouter>
      <div className='min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-[background-color] duration-300 ease-out flex flex-col pb-12'>
        {/* Global Banner */}
        <div className='w-full'>
          <div className='bg-amber-100 dark:bg-amber-900 py-2 text-center text-[10px] sm:text-xs font-medium text-amber-800 dark:text-amber-400 flex items-center justify-center gap-1 border-b dark:border-amber-900/20'>
            <Construction className="w-3 h-3" />
            <span>HistoBowl is in alpha. Many features are incomplete or missing. Expect updates soon!</span>
          </div>
        </div>

        {/* Global Navbar */}
        <nav className="sticky top-0 z-40 bg-white dark:bg-slate-900">
          <div className="h-16">TEST NAVBAR</div>
        </nav>

        {/* Dynamic Section */}
        <main className="flex-1 py-12 sm:py-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/players" element={<Players />} />
          </Routes>
        </main>

        {/* Copyright Footer - Sits safely above the fixed ticker banner */}
        <footer className="w-full py-6 mt-auto flex justify-center items-center border-t border-slate-200/50 dark:border-slate-800/50 transition-[border-color] duration-300 ease-out">
          <p className="text-xs font-medium text-slate-400 select-none tracking-wide">
            &copy; 2026 HistoBowl. All rights reserved.
          </p>
        </footer>

        {/* Global Scrolling Ticker*/}
        <BroadcastTicker/>

      </div>
    </BrowserRouter>
  );
}

function BroadcastTicker() {
  const newsItems = [
    'HistoBowl enters alpha stages of development',
    'Robarge & O\'Bryant conquer The Luci',
    'Raymond Teece wins first PBA title in Sweden',
    'Jakob Butturff passes away at 32',
    'Bowling Planet starts short-form video series',
    'DeeRonn Booker announces cancer diagnosis',
    'Liz Johnson claims USBC Senior Queens in nail-biting finish',
    'EJ Tackett becomes 2026 Player of the Year',
    'Randy Pedersen passes away at 64',
    'Brandon Bonta named 2026 Rookie of the Year'
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-slate-200 dark:border-slate-800 h-10 2xl:h-12 flex items-center overflow-hidden z-50 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] dark:shadow-[0_-8px_24px_rgba(0,0,0,0.3)] transition-[background-color,border-color,color] duration-300 ease-out">
      <div className="bg-orange-600 text-white px-4 2xl:px-6 h-full flex items-center font-black text-[10px] 2xl:text-xs uppercase tracking-widest shrink-0 z-10 shadow-lg">News</div>
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-slate-100 dark:bg-slate-950 transition-[background-color,border-color,color] duration-300 ease-out">
        <div className="animate-marquee whitespace-nowrap flex w-max items-center">
          {[0, 1, 2, 3].map((group) => (
            <div
              key={group}
              aria-hidden={group > 0}
              className="flex shrink-0 items-center gap-8 2xl:gap-12 pr-8 2xl:pr-12"
            >
              {newsItems.map((news, i) => (
                <span
                  key={i}
                  className="text-slate-700 dark:text-slate-300 text-xs 2xl:text-sm font-semibold uppercase flex items-center gap-2 2xl:gap-3 transition-[background-color,border-color,color] duration-300 ease-out"
                >
                  <span className="text-orange-500 text-[8px] 2xl:text-[10px]">●</span>
                  {news}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex bg-slate-50 dark:bg-black px-2 2xl:px-4 h-full items-center border-l border-slate-200 dark:border-slate-800 text-[8px] 2xl:text-[10px] font-mono text-slate-500 transition-[background-color,border-color,color] duration-300 ease-out">v0.6.0-ALPHA</div>
    </footer>
  );
}

export default App;
