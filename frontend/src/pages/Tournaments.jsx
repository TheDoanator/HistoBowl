import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  DollarSign,
  Droplet,
  MapPin,
  Settings2,
  Trophy,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

function getTournamentSortValue(tournament, key) {
  const value = tournament[key];

  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (key === 'prize_money') {
    const prizeMoney = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ''));
    return Number.isNaN(prizeMoney) ? null : prizeMoney;
  }

  const dateText = String(value).trim();
  const startDate = dateText.match(/^([A-Za-z]+)\.?\s+(\d{1,2})/);
  const years = dateText.match(/\b\d{4}\b/g);

  if (startDate && years) {
    const timestamp = Date.parse(`${startDate[1]} ${startDate[2]}, ${years.at(-1)}`);
    if (!Number.isNaN(timestamp)) return timestamp;
  }

  const timestamp = Date.parse(dateText);
  return Number.isNaN(timestamp) ? null : timestamp;
}

export default function Tournaments() {
  // 1. DATA FETCHING (React Query)
  const { data: tournaments, isLoading, isError, error } = useQuery({
    queryKey: ['tournamentsData'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tournaments`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    },
    staleTime: Infinity, 
  });

  // 2. UI STATE VARIABLES
  const [selectedSeason, setSelectedSeason] = useState('');
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [visibleColumns, setVisibleColumns] = useState({
    dates: true,
    location: true,
    winner: true,
    oil: false,
    prize_money: true,
  });

  // 3. UI LOGIC & CALCULATIONS
  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  // Generate the list of seasons
  const seasons = tournaments
    ? [...new Set(tournaments.map(t => t.season))].sort().reverse()
    : [];

  // DERIVED STATE: If they haven't clicked anything yet, just use the newest season automatically!
  const activeSeason = selectedSeason || (seasons.length > 0 ? seasons[0] : '');

  // Filter based on the activeSeason instead
  const filteredTournaments = tournaments
    ? tournaments.filter(t => t.season === activeSeason)
    : [];
  const sortedTournaments = sortConfig.key
    ? [...filteredTournaments].sort((tournamentA, tournamentB) => {
        const valueA = getTournamentSortValue(tournamentA, sortConfig.key);
        const valueB = getTournamentSortValue(tournamentB, sortConfig.key);

        if (valueA === null && valueB === null) return 0;
        if (valueA === null) return 1;
        if (valueB === null) return -1;

        const comparison = valueA - valueB;
        return sortConfig.direction === 'ascending' ? comparison : -comparison;
      })
    : filteredTournaments;

  const handleSort = (key) => {
    setSortConfig((currentSort) => ({
      key,
      direction: currentSort.key === key && currentSort.direction === 'ascending'
        ? 'descending'
        : 'ascending',
    }));
  };

  const DateSortIcon = sortConfig.key === 'airdate'
    ? sortConfig.direction === 'ascending' ? ArrowUp : ArrowDown
    : ArrowUpDown;
  const PrizeSortIcon = sortConfig.key === 'prize_money'
    ? sortConfig.direction === 'ascending' ? ArrowUp : ArrowDown
    : ArrowUpDown;

  // 4. LOADING & ERROR SCREENS
  if (isLoading) return <div className="text-white dark:text-slate-400 text-center mt-10">Loading tournaments...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;

  // 5. MAIN RENDER
  return (
    <FadeIn>
      <div className="max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4">
        
        {/* Header Block & Selector Configurations */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-6 mb-6">
          <div>
            <h1 className="text-5xl font-black italic tracking-tight uppercase text-slate-900 dark:text-white">
              Tournaments
            </h1>
            {/*<p className="text-base font-medium text-slate-500 dark:text-slate-400 mt-2">
              Select a season to view results.
            </p>*/}
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            
            {/* COLUMNS VISIBILITY CONFIGURATOR DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsSeasonOpen(false);
                  setShowColumnToggle(!showColumnToggle);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg shadow-sm font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <Settings2 className="w-4 h-4 text-orange-500" />
                Columns
              </button>

              {showColumnToggle && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowColumnToggle(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-4 z-20 flex flex-col gap-3">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
                      Visible Columns
                    </p>
                    {Object.keys(visibleColumns).map((col) => (
                      <label key={col} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 cursor-pointer hover:text-orange-500 transition-colors select-none">
                        <input 
                          type="checkbox"
                          checked={visibleColumns[col]}
                          onChange={() => toggleColumn(col)}
                          className="w-4 h-4 rounded text-orange-600 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer accent-orange-500"
                        />
                        {col === 'oil' ? 'Oil Pattern' : col.replace('_', ' ')}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>

          {/* SEASON SELECT CUSTOM DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowColumnToggle(false);
                  setIsSeasonOpen(!isSeasonOpen);
                }}
                className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm font-black text-sm tracking-tight text-slate-800 dark:text-white outline-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors min-w-[120px] text-left flex items-center justify-between gap-2"
              >
                <span>{activeSeason || 'Season'}</span>
                <span className="text-xs text-slate-400 select-none">▼</span>
              </button>
  
              {isSeasonOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsSeasonOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 max-h-125 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-1.5 z-20 flex flex-col gap-0.5 scrollbar-thin">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest px-2.5 py-2 border-b border-slate-100 dark:border-slate-800 mb-1 sticky top-[-6px] bg-white dark:bg-slate-900 z-10 rounded-t-xl">
                      Seasons
                    </p>
                    
                    {seasons.map((season) => (
                      <button
                        key={season}
                        onClick={() => {
                          setSelectedSeason(season);
                          setIsSeasonOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                          selectedSeason === season
                            ? 'bg-orange-600 text-white'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* MAIN HISTORICAL ARCHIVE DATA TABLE */}
        {/* --- MOBILE VIEW: CARDS (Visible only on small screens) --- */}
        {tournaments && (
          <div className="flex flex-col gap-4 md:hidden">
            {filteredTournaments.length === 0 ? (
              <div className="text-center py-12 text-slate-400 italic bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">No records found.</div>
            ) : (
              sortedTournaments.map((t) => (
                <div key={t.id} className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex flex-col gap-3">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">{t.event}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                    {visibleColumns.winner && (
                      <div className="col-span-2 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Winner</p>
                          <p className="font-bold text-orange-600 dark:text-orange-400">{t.winner}</p>
                        </div>
                      </div>
                    )}
                    {visibleColumns.dates && (
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Dates</p>
                          <p className="font-medium text-slate-700 dark:text-slate-300 text-xs">{t.airdate}</p>
                        </div>
                      </div>
                    )}
                    {visibleColumns.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Location</p>
                          <p className="font-medium text-slate-700 dark:text-slate-300 text-xs">{t.city}</p>
                        </div>
                      </div>
                    )}
                    {visibleColumns.prize_money && (
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Prize</p>
                          <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">{t.prize_money || '—'}</p>
                        </div>
                      </div>
                    )}
                    {visibleColumns.oil && (
                      <div className="col-span-2 flex items-start gap-2 pt-1">
                        <Droplet className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Oil Pattern</p>
                          <p className="font-medium italic text-slate-600 dark:text-slate-400 text-xs">{t.oil || 'N/A'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {/* --- DESKTOP VIEW: TABLE (Hidden on mobile, visible on md and up) --- */}
        {tournaments && (
          <div className="hidden md:block w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/40 transition-colors duration-300 ease-out">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black uppercase tracking-widest text-slate-400 h-12 transition-colors duration-300 ease-out">
                  <th className="pl-6 py-3 w-1/4">Event</th>
                  {visibleColumns.dates && (
                    <th
                      scope="col"
                      aria-sort={sortConfig.key === 'airdate' ? sortConfig.direction : 'none'}
                      className="px-4 py-3"
                    >
                      <button
                        type="button"
                        onClick={() => handleSort('airdate')}
                        className={`inline-flex items-center gap-1.5 uppercase transition-colors cursor-pointer hover:text-orange-600 focus-visible:outline-none focus-visible:text-orange-600 ${
                          sortConfig.key === 'airdate' ? 'text-orange-600 dark:text-orange-400' : ''
                        }`}
                      >
                        <span>Dates</span>
                        <DateSortIcon aria-hidden="true" className="w-3.5 h-3.5" />
                      </button>
                    </th>
                  )}
                  {visibleColumns.location && <th className="px-4 py-3">Location</th>}
                  {visibleColumns.winner && <th className="px-4 py-3">Winner</th>}
                  {visibleColumns.oil && <th className="px-4 py-3">Oil Pattern</th>}
                  {visibleColumns.prize_money && (
                    <th
                      scope="col"
                      aria-sort={sortConfig.key === 'prize_money' ? sortConfig.direction : 'none'}
                      className="px-4 py-3"
                    >
                      <button
                        type="button"
                        onClick={() => handleSort('prize_money')}
                        className={`inline-flex items-center gap-1.5 uppercase transition-colors cursor-pointer hover:text-orange-600 focus-visible:outline-none focus-visible:text-orange-600 ${
                          sortConfig.key === 'prize_money' ? 'text-orange-600 dark:text-orange-400' : ''
                        }`}
                      >
                        <span>Prize Money</span>
                        <PrizeSortIcon aria-hidden="true" className="w-3.5 h-3.5" />
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y text-sm font-medium">
                {filteredTournaments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-400 italic">No records found.</td>
                  </tr>
                ) : (
                  sortedTournaments.map((t) => (
                    <tr key={t.id} className="border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-300 ease-out h-16 group">
                      <td className="pl-6 py-4 font-black text-slate-900 dark:text-white max-w-[250px]">{t.event}</td>
                      {visibleColumns.dates && <td className="px-4 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">{t.airdate}</td>}
                      {visibleColumns.location && <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{t.city}</td>}
                      {visibleColumns.winner && <td className="px-4 py-4 font-bold text-orange-600 dark:text-orange-400">{t.winner}</td>}
                      {visibleColumns.oil && <td className="px-4 py-4 text-slate-600 dark:text-slate-400 italic text-xs">{t.oil || 'N/A'}</td>}
                      {visibleColumns.prize_money && <td className="px-4 py-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{t.prize_money || '—'}</td>}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
