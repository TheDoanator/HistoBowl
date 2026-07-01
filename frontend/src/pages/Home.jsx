import FadeIn from '../components/FadeIn';

function Home() {
  return (
    <FadeIn>
      <div className="flex items-center justify-center flex-1 flex-col mt-16 max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4 text-center">
        {/* 1. Main Title Text */}
        <h1 className="text-6xl font-black italic tracking-tight text-slate-900 dark:text-white transition-colors duration-500">
          THIS IS
        </h1>
        
        {/* 2. Gradient Branding Text */}
        <h2 className="text-8xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-300 -mt-2">
          HISTOBOWL.
        </h2>
        
        {/* 3. Subtitle / Description */}
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium text-center">
          The most comprehensive database for professional bowling statistics and match results.
        </p>

        {/* 4. Metric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16 mb-8">
          
          {/* Card 1: The Scope */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 shadow-xl dark:shadow-black/20 flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 hover:-translate-y-1">
            <span className="text-5xl font-black italic tracking-tight text-slate-900 dark:text-white">
              2,000+
            </span>
            <span className="text-[11px] font-black tracking-widest text-orange-600 uppercase mt-2">
              Tournaments
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Multi-Format Archiving
            </span>
          </div>

          {/* Card 2: The Authority Status */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 shadow-xl dark:shadow-black/20 flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 hover:-translate-y-1">
            <span className="text-5xl font-black italic tracking-tight text-slate-900 dark:text-white">
              1 of 1
            </span>
            <span className="text-[11px] font-black tracking-widest text-orange-600 uppercase mt-2">
              Bowling Archive
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              The Only Of Its Kind
            </span>
          </div>

          {/* Card 3: The Longevity */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 shadow-xl dark:shadow-black/20 flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 hover:-translate-y-1">
            <span className="text-5xl font-black italic tracking-tight text-slate-900 dark:text-white">
              60+
            </span>
            <span className="text-[11px] font-black tracking-widest text-orange-600 uppercase mt-2">
              Seasons
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              1963 - 2025
            </span>
          </div>

        </div>
      </div>
    </FadeIn>
  );
}

export default Home;