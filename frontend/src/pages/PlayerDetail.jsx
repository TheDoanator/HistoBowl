import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

function formatValue(value) {
  if (value === null || value === undefined || String(value).trim() === '') return '—';
  return value;
}

function formatBirthdate(value) {
  if (value === null || value === undefined || String(value).trim() === '') return '—';

  const dateText = String(value).trim();
  const shortDateMatch = dateText.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  let date;

  if (shortDateMatch) {
    const month = Number(shortDateMatch[1]);
    const day = Number(shortDateMatch[2]);
    const shortYear = Number(shortDateMatch[3]);
    const currentTwoDigitYear = new Date().getUTCFullYear() % 100;
    const year = shortDateMatch[3].length === 2
      ? shortYear <= currentTwoDigitYear ? 2000 + shortYear : 1900 + shortYear
      : shortYear;

    date = new Date(Date.UTC(year, month - 1, day));

    if (
      date.getUTCFullYear() !== year
      || date.getUTCMonth() !== month - 1
      || date.getUTCDate() !== day
    ) {
      return dateText;
    }
  } else {
    date = new Date(dateText);
  }

  if (Number.isNaN(date.getTime())) return dateText;

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function formatHandedness(value) {
  if (value === null || value === undefined || String(value).trim() === '') return '—';

  const handedness = String(value).trim().toUpperCase();
  const handednessLabels = {
    '1HR': 'One-handed · Right',
    '1HL': 'One-handed · Left',
    '2HR': 'Two-handed · Right',
    '2HL': 'Two-handed · Left',
  };

  return handednessLabels[handedness] || String(value).trim();
}

function formatActiveStatus(value) {
  if (value === null || value === undefined || value === '') return '—';

  const normalizedValue = String(value).trim().toLocaleLowerCase();
  return ['true', '1', 'yes', 'active'].includes(normalizedValue) ? 'Active' : 'Inactive';
}

function CountryFlag({ country }) {
  const countryCode = String(country ?? '').trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(countryCode)) return '—';

  const flagCode = countryCode === 'UK' ? 'gb' : countryCode.toLowerCase();

  return (
    <span className="inline-flex h-6 w-9 items-center justify-center align-middle">
      <img
        src={`/flags/${flagCode}.svg`}
        alt={`${countryCode} flag`}
        className="block h-auto max-h-6 w-9 object-contain"
        onLoad={(event) => {
          event.currentTarget.hidden = false;
          event.currentTarget.nextElementSibling.hidden = true;
        }}
        onError={(event) => {
          event.currentTarget.hidden = true;
          event.currentTarget.nextElementSibling.hidden = false;
        }}
      />
      <span hidden>—</span>
    </span>
  );
}

export default function PlayerDetail() {
  const { slug } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/players/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayer(data);
      });
  }, [slug]);

  console.log(player);

  if (!player) {
    return <div className="text-white dark:text-slate-400 text-center mt-10">Loading...</div>;
  }

  const activeStatus = formatActiveStatus(player.currently_active);

return (
  <FadeIn>
    <section
      aria-labelledby="player-name"
      className="w-full max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4 pb-4 sm:pb-6 lg:pb-8"
    >
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

      <section aria-labelledby="career-snapshot-heading" className="mt-8 sm:mt-10">
        <div className="flex items-center gap-3 mb-3">
          <h2
            id="career-snapshot-heading"
            className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase"
          >
            Career Snapshot
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm transition-[background-color,border-color,color] duration-300 ease-out">
          <div className="min-w-0 p-4 sm:p-6 border-b border-r border-slate-200 dark:border-slate-800 lg:border-b-0">
            <dt className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">Titles</dt>
            <dd className="mt-2 text-3xl sm:text-4xl font-black italic tracking-tight text-orange-600">
              {formatValue(player.titles)}
            </dd>
          </div>
          <div className="min-w-0 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 lg:border-b-0 lg:border-r">
            <dt className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">Major Titles</dt>
            <dd className="mt-2 text-3xl sm:text-4xl font-black italic tracking-tight text-orange-600">
              {formatValue(player.major_titles)}
            </dd>
          </div>
          <div className="min-w-0 p-4 sm:p-6 border-r border-slate-200 dark:border-slate-800">
            <dt className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">Earnings</dt>
            <dd className="mt-2 break-words text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {formatValue(player.earnings)}
            </dd>
          </div>
          <div className="min-w-0 p-4 sm:p-6">
            <dt className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">Status</dt>
            <dd className="mt-3">
              <span className="inline-flex rounded-full border border-orange-200 dark:border-orange-900/70 bg-orange-50 dark:bg-orange-950/30 px-3 py-1 text-[11px] font-black italic tracking-[0.12em] text-orange-600 uppercase">
                {activeStatus}
              </span>
            </dd>
          </div>
        </dl>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
        <section
          aria-labelledby="player-details-heading"
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30 p-5 sm:p-6 transition-[background-color,border-color,color] duration-300 ease-out"
        >
          <h2
            id="player-details-heading"
            className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-orange-600 uppercase"
          >
            Player Details
          </h2>

          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="min-w-0">
              <dt className="text-[10px] font-black tracking-[0.16em] text-slate-400 uppercase">Hometown</dt>
              <dd className="mt-1.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                {formatValue(player.hometown)}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-black tracking-[0.16em] text-slate-400 uppercase">Country</dt>
              <dd className="mt-1.5 leading-none">
                <CountryFlag key={player.country} country={player.country} />
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-black tracking-[0.16em] text-slate-400 uppercase">Birthdate</dt>
              <dd className="mt-1.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                {formatBirthdate(player.birthdate)}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-black tracking-[0.16em] text-slate-400 uppercase">Handedness</dt>
              <dd className="mt-1.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                {formatHandedness(player.handedness)}
              </dd>
            </div>
          </dl>
        </section>

        <section
          aria-labelledby="career-span-heading"
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 p-5 sm:p-6 text-white shadow-sm"
        >
          <h2
            id="career-span-heading"
            className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-orange-500 uppercase"
          >
            Career Span
          </h2>

          <dl className="mt-5 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <div>
              <dt className="text-[10px] font-black tracking-[0.16em] text-slate-500 uppercase">First Season</dt>
              <dd className="mt-1 text-2xl sm:text-3xl font-black italic tracking-tight">
                {formatValue(player.first_season)}
              </dd>
            </div>
            <span aria-hidden="true" className="mb-3 h-0.5 w-5 sm:w-8 bg-orange-600" />
            <div className="text-right">
              <dt className="text-[10px] font-black tracking-[0.16em] text-slate-500 uppercase">Last Season</dt>
              <dd className="mt-1 text-2xl sm:text-3xl font-black italic tracking-tight">
                {formatValue(player.last_season)}
              </dd>
            </div>
          </dl>
        </section>
      </div>

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
