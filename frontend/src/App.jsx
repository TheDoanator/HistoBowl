import './App.css'
import { useState } from 'react';
import { Construction, Sun, Moon, Menu, X } from 'lucide-react'; 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import our router tools
import Home from './pages/Home'; // Import our new home brick
import Tournaments from './pages/Tournaments'; // Import our new tournaments brick

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
        <nav className="sticky top-0 z-40 border-b bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 backdrop-blur-sm transition-[background-color,border-color] duration-300 ease-out">
          <div className="max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4 flex justify-between h-16 items-center">
            
            {/* Clicking the Logo takes you Home */}
            <Link to="/" className="flex items-center gap-1 cursor-pointer select-none group">
              <img 
                src="/favicon.png" 
                alt="HistoBowl Logo" 
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white">
                HISTOBOWL
              </span>
            </Link>

            {/* Desktop nav links - hidden below md, shown at md and up */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-black italic tracking-wide uppercase hover:text-orange-600">
                HOME
              </Link>
              <Link to="/tournaments" className="text-sm font-black italic tracking-wide uppercase hover:text-orange-600">
                TOURNAMENTS
              </Link>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile controls - theme toggle + hamburger, shown below md only */}
            <div className="flex md:hidden items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer"
                aria-label="Toggle Menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          
          {/* Mobile dropdown menu */}
          <div
            className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
              isMenuOpen ? 'max-h-40 opacity-100 border-t border-slate-200 dark:border-slate-800' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4 flex flex-col py-4 gap-4 bg-white/95 dark:bg-slate-900/95">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-black italic tracking-wide uppercase hover:text-orange-600"
              >
                HOME
              </Link>
              <Link 
                to="/tournaments" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-black italic tracking-wide uppercase hover:text-orange-600"
              >
                TOURNAMENTS
              </Link>
            </div>
          </div>
        </nav>

        {/* Dynamic Section */}
        <main className="flex-1 py-12 sm:py-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<Tournaments />} />
          </Routes>
        </main>

        {/* Copyright Footer - Sits safely above the fixed ticker banner */}
        <footer className="w-full py-6 mt-auto flex justify-center items-center border-t border-slate-200/50 dark:border-slate-800/50">
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
    'Tackett accomplishes 4th straight World Championship',
    'Storm clinches 2026 PBA Elite League: Battle of the Brands',
    'Kent wins inaugural Norm Duke Open'
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 dark:bg-black border-t border-slate-800 h-12 flex items-center overflow-hidden z-50 shadow-2xl">
      <div className="bg-orange-600 text-white px-4 md:px-6 h-full flex items-center font-black text-[10px] md:text-xs uppercase tracking-widest shrink-0 z-10 shadow-lg">Updates</div>
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-slate-950">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 md:gap-12 px-4">
          {[...newsItems, ...newsItems].map((news, i) => (
            <span key={i} className="text-slate-300 text-xs md:text-sm font-semibold uppercase flex items-center gap-2 md:gap-3">
              <span className="text-orange-500 text-[8px] md:text-[10px]">●</span> {news}
            </span>
          ))}
        </div>
      </div>
      <div className="flex bg-slate-900 dark:bg-black px-2 md:px-4 h-full items-center border-l border-slate-800 text-[8px] md:text-[10px] font-mono text-slate-500">v0.5.1-ALPHA</div>
    </footer>
  );
}

export default App;