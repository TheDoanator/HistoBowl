import FadeIn from '../components/FadeIn';
import { Link } from 'react-router-dom';

const historySources = [
  { name: 'Old Broadcasts', detail: 'VHS · Replays', desktop: ['30%', '13.04%'], mobile: ['30%', '7.14%'] },
  { name: 'Archived Websites', detail: 'Dead Links', desktop: ['36%', '32.6%'], mobile: ['70%', '16.96%'] },
  { name: 'Scanned PDFs', detail: 'Unsearchable', desktop: ['34%', '50%'], mobile: ['28%', '26.79%'] },
  { name: 'Media Guides', detail: 'Out of Print', desktop: ['33%', '69.57%'], mobile: ['72%', '36.61%'] },
  { name: 'Incomplete Records', detail: 'Gaps', desktop: ['27%', '88.04%'], mobile: ['38%', '46.43%'] },
];

const desktopFlowPaths = [
  'M320 60 C455 60 555 230 655 230 L720 230',
  'M320 150 C455 150 555 230 655 230 L720 230',
  'M320 230 C455 230 555 230 655 230 L720 230',
  'M320 320 C455 320 555 230 655 230 L720 230',
  'M320 405 C455 405 555 230 655 230 L720 230',
];

const mobileFlowPaths = [
  'M120 40 C120 150 200 300 200 420',
  'M280 95 C280 190 200 310 200 420',
  'M110 150 C110 245 200 330 200 420',
  'M290 205 C290 285 200 345 200 420',
  'M150 260 C150 325 200 365 200 420',
];

function Home() {
  return (
    <FadeIn>
      <section className="flex flex-col items-start mt-2 sm:mt-6 lg:mt-8 py-4 sm:py-6 lg:py-8 w-full max-w-[90%] mx-auto px-2 sm:px-4 text-left">
        <h1 className="text-[clamp(3rem,14vw,3.5rem)] sm:text-[clamp(2.75rem,7.5vw,7.25rem)] leading-[0.82] font-black italic tracking-tight text-slate-900 dark:text-white transition-[background-color,border-color,color] duration-300 ease-out">
          THIS IS
        </h1>

        <h2 className="max-w-full text-[clamp(3.4rem,15vw,3.875rem)] sm:text-[clamp(3.5rem,12.75vw,11.5rem)] leading-[0.82] font-black italic tracking-[-0.055em] sm:tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-300">
          HISTOBOWL.
        </h2>

        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 xl:gap-12 w-full mt-10 sm:mt-14 lg:mt-16">
          <p className="max-w-xl pl-4 sm:pl-6 border-l-2 border-orange-600 text-sm sm:text-lg lg:text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium transition-[background-color,border-color,color] duration-300 ease-out">
            Explore the history of professional bowling through decades of PBA tournaments, players, titles, and earnings, all in one growing archive.
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
              className="flex items-center justify-between gap-8 w-full sm:w-[19rem] min-h-10 sm:min-h-24 px-6 sm:px-10 py-1 sm:py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 font-black italic tracking-wide uppercase outline-none transition-[background-color,border-color,color] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
            >
              <span className="text-sm sm:text-lg leading-tight whitespace-nowrap">Browse Players</span>
              <span aria-hidden="true" className="text-2xl leading-none">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="what-is-histobowl-heading"
        className="w-full max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4 mt-24 sm:mt-32 lg:mt-16 pt-12 sm:pt-16 border-t border-slate-200 dark:border-slate-800 transition-[background-color,border-color,color] duration-300 ease-out"
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
              className="text-[clamp(1.85rem,8vw,3.75rem)] lg:text-[clamp(3rem,4.4vw,4.75rem)] leading-[0.9] font-black italic tracking-[-0.045em] text-slate-900 dark:text-white uppercase transition-[background-color,border-color,color] duration-300 ease-out"
            >
              <span className="block">The Record Book</span>
              <span className="block text-orange-600">Professional</span>
              <span className="block"><span className="text-orange-600">Bowling</span> Never Had.</span>
            </h2>

            <div className="mt-8 sm:mt-10 max-w-2xl space-y-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 transition-[background-color,border-color,color] duration-300 ease-out">
              <p className="border-l-4 border-orange-600 pl-5 sm:pl-6 font-semibold text-slate-700 dark:text-slate-300 transition-[background-color,border-color,color] duration-300 ease-out">
                HistoBowl collects the results of PBA tournaments and the careers of the players who bowled them, in one searchable archive. Built for fans, researchers and anyone who wants to know just a little bit more about professional bowling.
              </p>
            </div>
          </div>

          <div className="w-full border-2 border-l-4 border-slate-300 border-l-orange-600 dark:border-slate-700 dark:border-l-orange-600 bg-white/70 dark:bg-slate-900/50 transition-[background-color,border-color,color] duration-300 ease-out">
            <div className="flex items-start gap-4 sm:gap-6 px-4 py-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 transition-[background-color,border-color,color] duration-300 ease-out">
              <span className="shrink-0 text-sm sm:text-base font-black italic text-orange-600">01</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-black italic tracking-wide text-slate-900 dark:text-white uppercase transition-[background-color,border-color,color] duration-300 ease-out">
                    Tournaments
                  </h3>
                  <span className="shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-1 text-[9px] font-black tracking-[0.16em] text-emerald-700 dark:text-emerald-300 uppercase transition-[background-color,border-color,color] duration-300 ease-out">
                    Complete
                  </span>
                </div>
                <p className="mt-1.5 pr-1 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 transition-[background-color,border-color,color] duration-300 ease-out">
                  Season by season. Titles, finals, venues, champions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-6 px-4 py-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 transition-[background-color,border-color,color] duration-300 ease-out">
              <span className="shrink-0 text-sm sm:text-base font-black italic text-orange-600">02</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-black italic tracking-wide text-slate-900 dark:text-white uppercase transition-[background-color,border-color,color] duration-300 ease-out">
                    Players
                  </h3>
                  <span className="shrink-0 rounded-full border border-orange-600 px-2.5 py-1 text-[9px] font-black tracking-[0.16em] text-orange-600 uppercase">
                    IN PROGRESS
                  </span>
                </div>
                <p className="mt-1.5 pr-1 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 transition-[background-color,border-color,color] duration-300 ease-out">
                  Careers, titles, earnings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 px-4 py-5 sm:p-6 bg-slate-100/70 dark:bg-slate-950/50 text-slate-400 dark:text-slate-600 transition-[background-color,border-color,color] duration-300 ease-out">
              <span className="shrink-0 text-sm sm:text-base font-black italic">03</span>
              <h3 className="text-base sm:text-lg font-black italic tracking-wide uppercase">
                More to Come
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="why-histobowl-heading"
        className="w-full max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4 mt-24 sm:mt-32 lg:mt-40 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-16 lg:pb-24 border-t border-slate-200 dark:border-slate-800 transition-[background-color,border-color,color] duration-300 ease-out"
      >
        <div className="flex items-center gap-3 mb-7 sm:mb-9">
          <span aria-hidden="true" className="h-0.5 w-10 sm:w-14 bg-orange-600" />
          <p className="text-[10px] sm:text-xs font-black tracking-[0.22em] text-orange-600 uppercase">
            Why HistoBowl Exists
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)] gap-10 lg:gap-16 xl:gap-24 items-end">
          <h2
            id="why-histobowl-heading"
            className="text-[clamp(1.65rem,7.5vw,3.2rem)] lg:text-[clamp(2.75rem,3.8vw,4.5rem)] leading-[0.9] font-black italic tracking-[-0.045em] text-slate-900 dark:text-white uppercase transition-[background-color,border-color,color] duration-300 ease-out"
          >
            <span className="block whitespace-nowrap">Bowling History</span>
            <span className="block whitespace-nowrap">Shouldn&apos;t Be This</span>
            <span className="block whitespace-nowrap text-orange-600">Hard to Find.</span>
          </h2>

          <div className="lg:pb-3">
            <p className="max-w-2xl border-l-4 border-orange-600 pl-5 sm:pl-6 text-sm sm:text-base font-semibold leading-relaxed text-slate-700 dark:text-slate-300 transition-[background-color,border-color,color] duration-300 ease-out">
              Decades of professional bowling results are scattered across old broadcasts, archived websites, PDFs, media guides, and incomplete records. HistoBowl brings that history together into one searchable archive.
            </p>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-16 overflow-hidden lg:overflow-visible">
          <div className="relative h-[39rem] lg:hidden">
            <svg aria-hidden="true" viewBox="0 0 400 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible text-slate-400 dark:text-slate-700 transition-[background-color,border-color,color] duration-300 ease-out">
              {mobileFlowPaths.map((path) => (
                <path key={path} d={path} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
              ))}
              <g className="drop-shadow-[0_0_4px_rgba(234,88,12,0.8)]">
                {mobileFlowPaths.map((path, index) => (
                  <path key={path} d={path} pathLength="100" fill="none" stroke="rgb(234 88 12)" strokeWidth="3" strokeLinecap="round" strokeDasharray="14 86" vectorEffect="non-scaling-stroke">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.6s" begin={`${index * -0.52}s`} repeatCount="indefinite" />
                  </path>
                ))}
              </g>
            </svg>

            {historySources.map((source) => (
              <div
                key={source.name}
                className="absolute z-10 flex max-w-[72%] -translate-x-1/2 -translate-y-1/2 items-center gap-2 border border-slate-300 border-l-4 border-l-orange-600 bg-white/95 dark:border-slate-800 dark:border-l-orange-600 dark:bg-slate-900/95 px-3 py-2 [clip-path:polygon(0_0,100%_0,96%_100%,0_100%)] transition-[background-color,border-color,color] duration-300 ease-out"
                style={{ left: source.mobile[0], top: source.mobile[1] }}
              >
                <span className="text-xs sm:text-sm font-black italic leading-none tracking-tight text-slate-900 dark:text-white uppercase whitespace-nowrap transition-[background-color,border-color,color] duration-300 ease-out">{source.name}</span>
                <span className="text-[7px] font-black tracking-[0.14em] text-slate-500 dark:text-slate-400 uppercase whitespace-nowrap transition-[background-color,border-color,color] duration-300 ease-out">{source.detail}</span>
              </div>
            ))}

            <div className="absolute left-1/2 top-[72%] z-20 w-[86%] max-w-sm -translate-x-1/2">
              <span aria-hidden="true" className="hb-archive-ring" />
              <div className="relative overflow-hidden border-2 border-orange-600 bg-white dark:bg-slate-950 px-6 py-6 sm:px-7 text-slate-900 dark:text-white transition-[background-color,border-color,color] duration-300 ease-out">
                <p className="text-[8px] font-black tracking-[0.24em] text-orange-500 uppercase">One Archive</p>
                <p className="mt-3 text-3xl sm:text-4xl font-black italic tracking-tight uppercase">Histo<span className="text-orange-600">Bowl</span></p>
                <p className="mt-5 border-t border-slate-300 dark:border-slate-700 pt-3 text-[8px] font-bold tracking-[0.13em] text-slate-600 dark:text-slate-300 uppercase transition-[background-color,border-color,color] duration-300 ease-out">Searchable · In One Place</p>
              </div>
            </div>
          </div>

          <div className="relative hidden h-[28.75rem] lg:block">
            <svg aria-hidden="true" viewBox="0 0 1000 460" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible text-slate-400 dark:text-slate-700 transition-[background-color,border-color,color] duration-300 ease-out">
              {desktopFlowPaths.map((path) => (
                <path key={path} d={path} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
              ))}
              <g className="drop-shadow-[0_0_4px_rgba(234,88,12,0.8)]">
                {desktopFlowPaths.map((path, index) => (
                  <path key={path} d={path} pathLength="100" fill="none" stroke="rgb(234 88 12)" strokeWidth="3" strokeLinecap="round" strokeDasharray="14 86" vectorEffect="non-scaling-stroke">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.6s" begin={`${index * -0.52}s`} repeatCount="indefinite" />
                  </path>
                ))}
              </g>
            </svg>

            {historySources.map((source) => (
              <div
                key={source.name}
                className="absolute z-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border border-slate-300 border-l-4 border-l-orange-600 bg-white/95 dark:border-slate-800 dark:border-l-orange-600 dark:bg-slate-900/95 px-4 py-3 transition-[background-color,border-color,color] duration-300 ease-out"
                style={{ left: 0, top: source.desktop[1], width: '32%', transform: 'translateY(-50%)' }}
              >
                <span className="text-base xl:text-xl font-black italic leading-none tracking-tight text-slate-900 dark:text-white uppercase whitespace-nowrap transition-[background-color,border-color,color] duration-300 ease-out">{source.name}</span>
                <span className="text-[8px] font-black tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase whitespace-nowrap transition-[background-color,border-color,color] duration-300 ease-out">{source.detail}</span>
              </div>
            ))}

            <div className="absolute left-[68%] top-1/2 z-20 w-[clamp(20rem,29vw,25rem)] -translate-y-1/2">
              <span aria-hidden="true" className="hb-archive-ring" />
              <div className="relative overflow-hidden border-2 border-orange-600 bg-white dark:bg-slate-950 px-8 py-9 xl:px-10 text-slate-900 dark:text-white transition-[background-color,border-color,color] duration-300 ease-out">
                <p className="text-[9px] font-black tracking-[0.28em] text-orange-500 uppercase">One Archive</p>
                <p className="mt-4 text-[clamp(2.5rem,3.4vw,3.25rem)] font-black italic tracking-tight uppercase">Histo<span className="text-orange-600">Bowl</span></p>
                <p className="mt-7 border-t border-slate-300 dark:border-slate-700 pt-5 text-[9px] font-bold tracking-[0.15em] text-slate-600 dark:text-slate-300 uppercase transition-[background-color,border-color,color] duration-300 ease-out">Searchable · In One Place</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <footer data-home-profile-footer className="w-full mt-12 sm:mt-16 -mb-12 sm:-mb-16 border-t border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30 py-10 sm:py-12 transition-[background-color,border-color,color] duration-300 ease-out">
        <div className="w-full max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4 text-center">
          <p className="mb-4 text-xs font-black tracking-[0.18em] text-slate-500 dark:text-slate-400 uppercase transition-[background-color,border-color,color] duration-300 ease-out">
            Proudly created by:
          </p>

          <article aria-labelledby="profile-card-name" className="w-full max-w-xs mx-auto border border-t-4 border-slate-200 border-t-orange-600 bg-white/80 dark:border-slate-800 dark:border-t-orange-600 dark:bg-slate-900/70 px-5 py-6 sm:px-6 sm:py-8 transition-[background-color,border-color,color] duration-300 ease-out">
            <img
              src="/founder_profile.jpg"
              alt="Kevin Doan"
              className="h-24 w-24 sm:h-28 sm:w-28 mx-auto rounded-full border-4 border-orange-600 object-cover object-center"
            />

            <h2 id="profile-card-name" className="mt-5 text-xl sm:text-2xl font-black tracking-tight text-orange-600">
              Kevin Doan
            </h2>
            <p className="mt-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 transition-[background-color,border-color,color] duration-300 ease-out">
              aka Bowling Planet
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-[background-color,border-color,color] duration-300 ease-out">
              Founder &amp; Developer
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="https://www.linkedin.com/in/kevindoann/"
                target="_blank"
                rel="noreferrer"
                aria-label="Kevin Doan on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center border border-slate-300 bg-slate-100 text-slate-800 transition-[background-color,border-color,color] duration-300 ease-out hover:border-orange-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-orange-500 dark:hover:text-orange-500"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M5.34 3.5A1.84 1.84 0 1 1 5.33 7.18 1.84 1.84 0 0 1 5.34 3.5ZM3.75 8.55h3.18V19.5H3.75V8.55Zm5.24 0h3.05v1.5h.04c.43-.8 1.47-1.65 3.03-1.65 3.24 0 3.84 2.14 3.84 4.91v6.19h-3.18v-5.49c0-1.31-.03-2.99-1.83-2.99-1.83 0-2.11 1.43-2.11 2.9v5.58H8.99V8.55Z" />
                </svg>
              </a>
              <a
                href="https://github.com/TheDoanator"
                target="_blank"
                rel="noreferrer"
                aria-label="Kevin Doan on GitHub"
                className="inline-flex h-10 w-10 items-center justify-center border border-slate-300 bg-slate-100 text-slate-800 transition-[background-color,border-color,color] duration-300 ease-out hover:border-orange-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-orange-500 dark:hover:text-orange-500"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2.5a9.75 9.75 0 0 0-3.08 19c.49.09.67-.21.67-.47v-1.87c-2.73.59-3.3-1.16-3.3-1.16-.45-1.14-1.09-1.44-1.09-1.44-.89-.61.07-.6.07-.6.99.07 1.51 1.01 1.51 1.01.88 1.5 2.3 1.07 2.86.82.09-.63.34-1.07.63-1.32-2.18-.25-4.47-1.09-4.47-4.82 0-1.07.38-1.94 1.01-2.62-.1-.25-.44-1.24.1-2.58 0 0 .82-.26 2.68 1a9.3 9.3 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .54 1.34.2 2.33.1 2.58.63.68 1.01 1.55 1.01 2.62 0 3.74-2.3 4.57-4.48 4.82.35.3.66.9.66 1.82v2.74c0 .26.18.57.67.47A9.75 9.75 0 0 0 12 2.5Z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Bowling_Planet"
                target="_blank"
                rel="noreferrer"
                aria-label="Bowling Planet on YouTube"
                className="inline-flex h-10 w-10 items-center justify-center border border-slate-300 bg-slate-100 text-slate-800 transition-[background-color,border-color,color] duration-300 ease-out hover:border-orange-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-orange-500 dark:hover:text-orange-500"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                  <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </article>

          <p className="mt-8 text-xs font-medium text-slate-400 select-none tracking-wide">
            &copy; 2026 HistoBowl. All rights reserved.
          </p>
        </div>
      </footer>
    </FadeIn>
  );
}

export default Home;
