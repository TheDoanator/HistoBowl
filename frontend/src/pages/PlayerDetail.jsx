import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayer(data);
      });
  }, [id]);

  console.log(player);

  if (!player) {
  return <div>Loading...</div>;
}

return (
  <FadeIn>
    <section
      aria-labelledby="player-name"
      className="w-full max-w-[90%] xl:max-w-[85%] mx-auto -mt-6 sm:-mt-8 px-2 sm:px-4 pb-4 sm:pb-6 lg:pb-8"
    >
      <Link
        to="/players"
        className="inline-flex mb-5 sm:mb-6 text-xs sm:text-sm font-black italic tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase transition-colors duration-200 ease-out hover:text-orange-600 dark:hover:text-orange-600"
      >
        ← BACK TO PLAYERS
      </Link>

      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <span aria-hidden="true" className="h-0.5 w-10 sm:w-14 bg-orange-600" />
        <p className="text-[10px] sm:text-xs font-black tracking-[0.22em] text-orange-600 uppercase">
          PLAYER PROFILE
        </p>
      </div>

      <div className="border-l-4 border-orange-600 pl-4 sm:pl-6">
        <h1
          id="player-name"
          className="text-[clamp(2.25rem,5.5vw,5.5rem)] leading-[0.82] font-black italic tracking-[-0.055em] text-slate-900 dark:text-white uppercase transition-[background-color,border-color,color] duration-300 ease-out"
        >
          {player.name}
        </h1>
      </div>

      <dl className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 py-5 border-y border-slate-200 dark:border-slate-800 transition-[background-color,border-color,color] duration-300 ease-out">
        <div>
          <dt className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">Hometown</dt>
          <dd className="mt-1 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">{player.hometown || '—'}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">Titles</dt>
          <dd className="mt-1 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">{player.titles ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">Earnings</dt>
          <dd className="mt-1 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">{player.earnings || '—'}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">Status</dt>
          <dd className="mt-1 text-sm sm:text-base font-black italic text-orange-600 uppercase">
            {player.currently_active ? 'Active' : 'Inactive'}
          </dd>
        </div>
      </dl>

      <section
        aria-labelledby="player-development-heading"
        className="w-full mx-auto mt-12 sm:mt-16 lg:mt-20 mb-8 sm:mb-12 lg:mb-16 px-5 sm:px-8 py-10 sm:py-14 border-y-2 border-orange-600 bg-slate-100/70 dark:bg-slate-900/50 text-center transition-[background-color,border-color,color] duration-300 ease-out"
      >
        <h2
          id="player-development-heading"
          className="text-[clamp(1.5rem,4vw,3.5rem)] leading-[0.95] font-black italic tracking-[-0.035em] text-orange-600 uppercase"
        >
          MORE PLAYER DATA COMING SOON
        </h2>
        <p className="max-w-2xl mx-auto mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 transition-colors duration-300 ease-out">
          Tournament history, televised finals appearances, season-by-season stats, and additional career insights are currently in development.
        </p>
      </section>
    </section>
  </FadeIn>
);
}
