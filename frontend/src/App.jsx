import './App.css'
import { Construction } from 'lucide-react'; 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import our router tools
import Home from './pages/Home'; // Import our new home brick
import Tournaments from './pages/Tournaments'; // Import our new tournaments brick

function App() {
  return (
    // 1. Wrap everything in BrowserRouter so routing works across the whole app
    <BrowserRouter>
      <div>

        {/* Global Banner */}
        <div className='w-full'>
          <div className='bg-amber-100 py-2 text-center text-xs font-medium text-amber-800 flex items-center justify-center gap-1'>
            <Construction className="w-3 h-3" />
            <span>HistoBowl is in alpha. Many features are incomplete or missing. Expect updates soon!</span>
          </div>
        </div>

        {/* Global Navbar */}
        <nav className="border-b bg-white/80 border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
            
            {/* Clicking the Logo takes you Home */}
            <Link to="/" className="text-xl font-black italic tracking-tighter cursor-pointer select-none">
              HISTOBOWL
            </Link>

            {/* Replaced standard <button> with <Link> */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-sm font-black italic tracking-wide uppercase hover:text-blue-600 transition-colors">
                HOME
              </Link>
              <Link to="/tournaments" className="text-sm font-black italic tracking-wide uppercase hover:text-blue-600 transition-colors">
                TOURNAMENTS
              </Link>
            </div>

          </div>
        </nav>

        {/* Dynamic Section */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
        </Routes>

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
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 h-12 flex items-center overflow-hidden z-50 shadow-2xl">
      <div className="bg-blue-600 text-white px-6 h-full flex items-center font-black text-xs uppercase tracking-widest shrink-0 z-10 shadow-lg">Updates</div>
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-slate-950">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-4">
          {[...newsItems, ...newsItems].map((news, i) => (
            <span key={i} className="text-slate-300 text-sm font-semibold uppercase flex items-center gap-3">
              <span className="text-blue-500 text-[10px]">●</span> {news}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden md:flex bg-slate-900 px-4 h-full items-center border-l border-slate-800 text-[10px] font-mono text-slate-500">v0.4.1-ALPHA</div>
    </footer>
  );
}

export default App;