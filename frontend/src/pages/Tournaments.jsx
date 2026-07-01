import { useState, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import { Settings2 } from 'lucide-react';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    dates: true,
    location: true,
    winner: true,
    oil: true,         // Default hidden to keep a clean aesthetic, user can toggle!
    prize_money: true // Default hidden
  });

  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    // Use the Render production URL if it exists, otherwise fall back to localhost for local development
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/api/tournaments`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tournament archives.');
        return res.json();
      })
      .then((data) => {
        setTournaments(data);
        
        // Dynamically compile a list of unique seasons straight from your data records
        const uniqueSeasons = [...new Set(data.map(item => item.season))].sort((a, b) => {
          // Extract the first 4 numbers from string (e.g. "2001-02" -> 2001, "1994" -> 1994)
          const yearA = parseInt(a.toString().substring(0, 4), 10);
          const yearB = parseInt(b.toString().substring(0, 4), 10);
          
          // Sort descending so the absolute newest seasons sit at the very top of the list
          return yearB - yearA;
        });
        setSeasons(uniqueSeasons);
        
        // Default the selector view to the most recent season present in the records
        if (uniqueSeasons.length > 0) {
          setSelectedSeason(uniqueSeasons[0]);
        }
        
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const filteredTournaments = tournaments.filter(t => t.season === selectedSeason);

return (
    <FadeIn>
      <div className="max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4">
        
        {/* Header Block & Selector Configurations */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-6 mb-6">
          <div>
            <h1 className="text-5xl font-black italic tracking-tight uppercase text-slate-900 dark:text-white">
              Tournaments
            </h1>
            <p className="text-base font-medium text-slate-500 dark:text-slate-400 mt-2">
              Select a season to view results.
            </p>
          </div>

          <div className="mt-6 sm:mt-0 flex items-center gap-3">
            
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
                  {/* Backdrop click shield to easily dismiss dropdown */}
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
                <span>{selectedSeason || 'Season'}</span>
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

        {/* Loading and Error Fallbacks */}
        {loading && <div className="text-center py-12 text-sm font-medium text-slate-500">Loading master archives...</div>}
        {error && <div className="text-center py-12 text-sm font-bold text-red-500">⚠️ Error connecting to server: {error}</div>}

        {/* MAIN HISTORICAL ARCHIVE DATA TABLE */}
        {!loading && !error && (
          <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/40">
            <table className="w-full text-left border-collapse min-w-[800px]">
              
              {/* Dynamic Headers */}
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black uppercase tracking-widest text-slate-400 h-12">
                  <th className="pl-6 py-3 w-1/4">Event</th>
                  {visibleColumns.dates && <th className="px-4 py-3">Dates</th>}
                  {visibleColumns.location && <th className="px-4 py-3">Location</th>}
                  {visibleColumns.winner && <th className="px-4 py-3">Winner</th>}
                  {visibleColumns.oil && <th className="px-4 py-3">Oil Pattern</th>}
                  {visibleColumns.prize_money && <th className="px-4 py-3">Prize Money</th>}
                </tr>
              </thead>

              {/* Dynamic Rows */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm font-medium">
                {filteredTournaments.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-12 text-slate-400 italic">No records found.</td>
                  </tr>
                ) : (
                  filteredTournaments.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors h-16 group">
                      
                      {/* Tournament Event Name */}
                      <td className="pl-6 py-4 font-black text-slate-900 dark:text-white max-w-[250px]">
                        {t.event}
                      </td>

                      {/* Evaluated Column Render Configurations */}
                      {visibleColumns.dates && (
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {t.airdate}
                        </td>
                      )}

                      {visibleColumns.location && (
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                          {t.city}
                        </td>
                      )}

                      {visibleColumns.winner && (
                        <td className="px-4 py-4 font-bold text-orange-600 dark:text-orange-400">
                          {t.winner}
                        </td>
                      )}

                      {visibleColumns.oil && (
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400 italic text-xs">
                          {t.oil || 'N/A'}
                        </td>
                      )}

                      {visibleColumns.prize_money && (
                        <td className="px-4 py-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          {t.prize_money || '—'}
                        </td>
                      )}
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

export default Tournaments;