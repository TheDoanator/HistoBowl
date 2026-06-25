import './App.css'
import { Construction } from 'lucide-react'; // Import standard icons

function App() {
  return (
    <div>

      <div className='w-full'>
        <div className='bg-amber-100 py-2 text-center text-xs font-medium text-amber-800 flex items-center justify-center gap-1'>
          <Construction className="w-3 h-3" />
          <span>HistoBowl is in alpha. Many features are incomplete or missing. Expect updates soon!</span>
        </div>
      </div>

      <nav className="border-b bg-white/80 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          
          <span className="text-xl font-black italic tracking-tighter cursor-pointer select-none">
            HISTOBOWL
          </span>

          <div className="flex items-center space-x-8">
            <button className="text-sm font-black italic tracking-wide uppercase">HOME</button>
            <button className="text-sm font-black italic tracking-wide uppercase">TOURNAMENTS</button>
          </div>

        </div>
      </nav>

      <div className="flex items-center justify-center flex-1 flex-col mt-12">
        {/* 1. Main Title Text */}
        <h1 className="text-6xl font-black italic tracking-tight">
          THIS IS
        </h1>
        
        {/* 2. Gradient Branding Text */}
        <h2 className="text-8xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 -mt-2">
          HISTOBOWL.
        </h2>
        
        {/* 3. Subtitle / Description */}
        <p className="text-xl text-slate-600 font-medium text-center">
          The most comprehensive database for professional bowling statistics and match results.
        </p>
        
        {/* 4. Search Box Container */}
        <div className="w-full max-w-2xl relative group mt-10">
          <input 
            type="text" 
            placeholder="Search players, matches, tournaments..." 
            className="w-full px-6 py-4 text-lg rounded-xl bg-white border border-slate-200 shadow-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
          <button className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase italic tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      <BroadcastTicker/>

    </div>
  );
}

function BroadcastTicker() {
  const newsItems = [
    'HistoBowl enters alpha stages of development',
    'HistoBowl receives revamped design',
    'Doan states that HistoBowl is once again in active development',
    'All basic tournament data is available'
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
      <div className="hidden md:flex bg-slate-900 px-4 h-full items-center border-l border-slate-800 text-[10px] font-mono text-slate-500">v0.4.0-ALPHA</div>
    </footer>
  );
}


export default App
