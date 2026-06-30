import FadeIn from '../components/FadeIn';

function Home() {
  return (
    <FadeIn>
      <div className="flex items-center justify-center flex-1 flex-col mt-12">
        {/* 1. Main Title Text */}
        <h1 className="text-6xl font-black italic tracking-tight text-slate-900 dark:text-white transition-colors duration-500">
          THIS IS
        </h1>
        
        {/* 2. Gradient Branding Text */}
        <h2 className="text-8xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 -mt-2">
          HISTOBOWL.
        </h2>
        
        {/* 3. Subtitle / Description */}
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium text-center">
          The most comprehensive database for professional bowling statistics and match results.
        </p>
        
        {/* 4. Search Box Container */}
        <div className="w-full max-w-2xl relative group mt-10">
          <input 
            type="text" 
            placeholder="Search functionality coming soon..." 
            disabled
            className="w-full px-6 py-4 text-lg rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-black/40 outline-none font-medium cursor-not-allowed text-slate-400 dark:text-slate-600 transition-[background-color,border-color,color] duration-300 ease-out"
          />
          <button className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 dark:bg-blue-700 text-white font-bold uppercase italic tracking-wider rounded-lg flex items-center gap-2 opacity-50 cursor-not-allowed">
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

export default Home;