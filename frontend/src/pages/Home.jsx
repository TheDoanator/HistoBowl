import FadeIn from '../components/FadeIn';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <FadeIn>
      <section className="flex min-h-[calc(100svh-13.5rem)] sm:min-h-[calc(100svh-14.5rem)] lg:min-h-[calc(100svh-15rem)] flex-col items-start justify-center lg:justify-start lg:pt-[clamp(3rem,9svh,6.5rem)] mt-2 sm:mt-6 lg:mt-8 w-full max-w-[90%] mx-auto px-2 sm:px-4 text-left">
        <h1 className="text-[clamp(3rem,14vw,3.5rem)] sm:text-[clamp(2.75rem,7.5vw,7.25rem)] leading-[0.82] font-black italic tracking-tight text-slate-900 dark:text-white transition-colors duration-500">
          THIS IS
        </h1>

        <h2 className="max-w-full text-[clamp(3.4rem,15vw,3.875rem)] sm:text-[clamp(3.5rem,12.75vw,11.5rem)] leading-[0.82] font-black italic tracking-[-0.055em] sm:tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-300">
          HISTOBOWL.
        </h2>

        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 xl:gap-12 w-full mt-10 sm:mt-14 lg:mt-16">
          <p className="max-w-xl pl-4 sm:pl-6 border-l-2 border-orange-600 text-sm sm:text-lg lg:text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            Explore the history of professional bowling through decades of PBA tournaments, players, results, titles, and earnings, alll in one growing archive.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full xl:w-auto shrink-0">
            <Link
              to="/tournaments"
              className="flex items-center justify-between gap-8 w-full sm:w-[19rem] min-h-12 sm:min-h-24 px-6 sm:px-10 py-1.5 sm:py-4 bg-orange-600 hover:bg-orange-500 text-slate-950 font-black italic tracking-wide uppercase outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
            >
              <span className="text-sm sm:text-lg leading-tight">
                Explore<br />Tournaments
              </span>
              <span aria-hidden="true" className="text-2xl leading-none">→</span>
            </Link>

            <Link
              to="/players"
              className="flex items-center justify-between gap-8 w-full sm:w-[19rem] min-h-10 sm:min-h-24 px-6 sm:px-10 py-1 sm:py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 font-black italic tracking-wide uppercase outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
            >
              <span className="text-sm sm:text-lg leading-tight whitespace-nowrap">Browse Players</span>
              <span aria-hidden="true" className="text-2xl leading-none">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="what-is-histobowl-heading"
        className="w-full max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4 mt-24 sm:mt-32 lg:mt-16 pt-12 sm:pt-16 border-t border-slate-200 dark:border-slate-800"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(26rem,0.9fr)] gap-12 lg:gap-16 xl:gap-24 items-center">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-7 sm:mb-9">
              <span aria-hidden="true" className="h-0.5 w-10 sm:w-14 bg-orange-600" />
              <p className="text-[10px] sm:text-xs font-black tracking-[0.22em] text-orange-600 uppercase">
                What is HistoBowl
              </p>
            </div>

            <h2
              id="what-is-histobowl-heading"
              className="text-[clamp(1.85rem,8vw,3.75rem)] lg:text-[clamp(3rem,4.4vw,4.75rem)] leading-[0.9] font-black italic tracking-[-0.045em] text-slate-900 dark:text-white uppercase"
            >
              <span className="block">The Record Book</span>
              <span className="block text-orange-600">Professional</span>
              <span className="block"><span className="text-orange-600">Bowling</span> Never Had.</span>
            </h2>

            <div className="mt-8 sm:mt-10 max-w-2xl space-y-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                HistoBowl collects the results of PBA tournaments — champions, fields, finals — and the careers of the players who bowled them, in one searchable archive.
              </p>
              <p>
                It&apos;s early. The tournament archive is live and the player database grows every week. Built for fans, researchers and anyone who wants to know who actually won.
              </p>
            </div>
          </div>

          <div className="w-full border-2 border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 shadow-[8px_8px_0_0_rgb(234_88_12)]">
            <div className="flex items-start gap-4 sm:gap-6 px-4 py-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
              <span className="shrink-0 text-sm sm:text-base font-black italic text-orange-600">01</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-black italic tracking-wide text-slate-900 dark:text-white uppercase">
                    Tournaments
                  </h3>
                  <span className="shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 px-2.5 py-1 text-[9px] font-black tracking-[0.16em] text-slate-600 dark:text-slate-200 uppercase">
                    Live
                  </span>
                </div>
                <p className="mt-1.5 pr-1 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Season by season. Titles, finals, venues.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-6 px-4 py-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
              <span className="shrink-0 text-sm sm:text-base font-black italic text-orange-600">02</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-black italic tracking-wide text-slate-900 dark:text-white uppercase">
                    Players
                  </h3>
                  <span className="shrink-0 rounded-full border border-orange-600 px-2.5 py-1 text-[9px] font-black tracking-[0.16em] text-orange-600 uppercase">
                    Growing
                  </span>
                </div>
                <p className="mt-1.5 pr-1 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Careers, titles, championship appearances.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 px-4 py-5 sm:p-6 bg-slate-100/70 dark:bg-slate-950/50 text-slate-400 dark:text-slate-600">
              <span className="shrink-0 text-sm sm:text-base font-black italic">03</span>
              <h3 className="text-base sm:text-lg font-black italic tracking-wide uppercase">
                More to Come
              </h3>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

export default Home;
